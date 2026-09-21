import { useState, useMemo, useEffect } from 'react';
import { Calculator, RefreshCw, IndianRupee, MessageCircle, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import clsx from 'clsx';
import { PRICING } from '../../config/pricing';

const PackageCalculator = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [eventType, setEventType] = useState('Wedding');
  const [selectedServices, setSelectedServices] = useState([]);
  const [discount, setDiscount] = useState('');
  const [notes, setNotes] = useState('');
  
  const [isPdfGenerated, setIsPdfGenerated] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [logoBase64, setLogoBase64] = useState(null);

  useEffect(() => {
    // Pre-load logo for PDF
    const img = new Image();
    img.src = '/logo.png';
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      // Use the smaller dimension to make a perfect square for a circular crop
      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      
      // Create a circular clipping path
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      
      // Draw the image centered and covering the circle
      const scale = Math.max(size / img.width, size / img.height);
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      const x = (size - scaledWidth) / 2;
      const y = (size - scaledHeight) / 2;
      
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
      setLogoBase64(canvas.toDataURL('image/png'));
    };
  }, []);

  useEffect(() => {
    setIsPdfGenerated(false);
    setPdfData(null);
  }, [customerName, customerPhone, eventType, selectedServices, discount, notes]);

  const currentServices = PRICING[eventType] || [];

  const calculatedTotal = useMemo(() => {
    return selectedServices.reduce((total, serviceName) => {
      const service = currentServices.find(s => s.name === serviceName);
      return total + (service ? service.price : 0);
    }, 0);
  }, [selectedServices, currentServices]);

  const parsedDiscount = parseInt(discount, 10) || 0;
  const actualDiscount = Math.min(Math.max(0, parsedDiscount), calculatedTotal);
  const finalPackagePrice = calculatedTotal - actualDiscount;

  const handleServiceToggle = (serviceName) => {
    setSelectedServices(prev => 
      prev.includes(serviceName)
        ? prev.filter(name => name !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleEventTypeChange = (e) => {
    const newType = e.target.value;
    setEventType(newType);
    
    // Validate if currently selected services exist in new event type
    const newAvailableServices = PRICING[newType].map(s => s.name);
    setSelectedServices(prev => prev.filter(name => newAvailableServices.includes(name)));
  };

  const normalizePhoneNumber = (phone) => {
    let cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
    if (/^[6-9]\d{9}$/.test(cleaned)) {
      return `91${cleaned}`;
    }
    if (/^0[6-9]\d{9}$/.test(cleaned)) {
      return `91${cleaned.substring(1)}`;
    }
    return cleaned;
  };

  const validateForm = () => {
    if (!customerName.trim()) {
      alert("Please enter the customer's name.");
      return false;
    }
    if (!customerPhone.trim()) {
      alert("Please enter the customer's WhatsApp number.");
      return false;
    }
    if (selectedServices.length === 0) {
      alert("Please select at least one service.");
      return false;
    }
    return true;
  };

  const handleGeneratePDF = () => {
    if (!validateForm()) return;

    const doc = new jsPDF();
    const primaryColor = [35, 33, 31];
    const pageWidth = doc.internal.pageSize.width;
    
    let currentY = 20;

    // Logo
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', (pageWidth / 2) - 15, currentY, 30, 30);
      currentY += 35;
    }
    
    // Brand Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(...primaryColor);
    doc.text("The Marvelous Photography", pageWidth / 2, currentY, { align: "center" });
    currentY += 8;
    
    // Document Title
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("PHOTOGRAPHY PACKAGE QUOTATION", pageWidth / 2, currentY, { align: "center" });
    currentY += 15;

    // Separator line
    doc.setDrawColor(230, 230, 230);
    doc.line(14, currentY, pageWidth - 14, currentY);
    currentY += 10;

    // Customer Info
    doc.setFontSize(11);
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text("Customer Details:", 14, currentY);
    currentY += 6;
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text(`Name: ${customerName.trim()}`, 14, currentY);
    currentY += 6;
    doc.text(`Phone: ${customerPhone.trim()}`, 14, currentY);
    currentY += 6;
    doc.text(`Event: ${eventType}`, 14, currentY);
    currentY += 10;

    const pdfCurrency = (amount) => formatCurrency(amount).replace('₹', 'Rs. ');

    // Table data
    const tableBody = selectedServices.map(serviceName => {
      const service = currentServices.find(s => s.name === serviceName);
      return [serviceName, service ? pdfCurrency(service.price) : '---'];
    });

    // Add table
    autoTable(doc, {
      startY: currentY,
      head: [[
        { content: 'Selected Services', styles: { halign: 'left' } },
        { content: 'Price', styles: { halign: 'right' } }
      ]],
      body: tableBody,
      theme: 'plain',
      headStyles: {
        fillColor: [246, 240, 228],
        textColor: primaryColor,
        fontStyle: 'bold',
      },
      styles: {
        cellPadding: 6,
        fontSize: 11,
      },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { halign: 'right', cellWidth: 50 }
      },
      margin: { left: 14, right: 14 }
    });

    currentY = doc.lastAutoTable.finalY + 5;
    
    // Totals Table
    autoTable(doc, {
      startY: currentY,
      body: [
        ['Calculated Total', pdfCurrency(calculatedTotal)],
        ['Discount Applied', pdfCurrency(actualDiscount)]
      ],
      theme: 'plain',
      styles: { 
        cellPadding: 4, 
        fontSize: 11,
        textColor: [80, 80, 80]
      },
      columnStyles: {
        0: { halign: 'left', fontStyle: 'normal' },
        1: { halign: 'right', fontStyle: 'normal', cellWidth: 50 }
      },
      margin: { left: 14, right: 14 }
    });

    currentY = doc.lastAutoTable.finalY;

    // Final Price Table
    autoTable(doc, {
      startY: currentY + 2,
      body: [
        ['FINAL PACKAGE PRICE', pdfCurrency(finalPackagePrice)]
      ],
      theme: 'plain',
      styles: { 
        cellPadding: 6, 
        fontSize: 13, 
        textColor: primaryColor,
        fillColor: [246, 240, 228]
      },
      columnStyles: {
        0: { halign: 'left', fontStyle: 'bold' },
        1: { halign: 'right', fontStyle: 'bold', cellWidth: 50 }
      },
      margin: { left: 14, right: 14 }
    });
    
    currentY = doc.lastAutoTable.finalY + 15;

    // Notes
    if (notes.trim()) {
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text("Additional Notes:", 14, currentY);
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      const splitNotes = doc.splitTextToSize(notes.trim(), pageWidth - 28);
      doc.text(splitNotes, 14, currentY + 7);
      currentY += 7 + (splitNotes.length * 6) + 5;
    }

    // Footer
    currentY += 10;
    doc.setDrawColor(230, 230, 230);
    doc.line(14, currentY, pageWidth - 14, currentY);
    currentY += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(150, 150, 150);
    doc.text("Thank you for choosing The Marvelous Photography for your special moments.", pageWidth / 2, currentY, { align: "center" });
    
    // Save to state instead of downloading immediately
    const sanitizedName = customerName.trim().replace(/[^a-zA-Z0-9]/g, '_') || 'Customer';
    const sanitizedEvent = eventType.replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `Photography_Package_${sanitizedName}_${sanitizedEvent}.pdf`;
    
    setPdfData({ blob: doc.output('blob'), fileName });
    setIsPdfGenerated(true);
  };

  const handleDownloadPDF = () => {
    if (!pdfData) return;
    const url = URL.createObjectURL(pdfData.blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = pdfData.fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleWhatsAppShare = () => {
    if (!pdfData) return;

    // 1. Download the PDF so the photographer has it ready to attach
    handleDownloadPDF();
    
    // 2. Open WhatsApp directly to the specific customer chat
    const normalizedPhone = normalizePhoneNumber(customerPhone);
    const message = `Hello ${customerName.trim()},\n\nPlease find your photography package quotation attached as a PDF.\n\nThank you for choosing us for your special moments.\nPlease let us know if you have any questions.`;
    const whatsappUrl = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleClear = () => {
    setCustomerName('');
    setCustomerPhone('');
    setEventType('Wedding');
    setSelectedServices([]);
    setDiscount('');
    setNotes('');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div>
      <div className="mb-8 border-b border-dark/10 pb-6">
        <h2 className="font-serif text-3xl text-dark mb-2 flex items-center gap-3">
          <Calculator className="text-primary" /> Package Calculator
        </h2>
        <p className="text-dark/60 font-light">Create and calculate a custom photography package for your customer.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        
        {/* LEFT COLUMN: Input Fields */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: Customer Details */}
          <div className="bg-white/50 border border-dark/10 p-6 rounded-lg shadow-sm">
            <h3 className="font-sans font-medium text-sm tracking-widest text-dark uppercase mb-4">Customer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-dark/70 mb-2">Customer Name</label>
                <input 
                  type="text" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-white border border-dark/20 p-3 rounded text-dark focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-dark/70 mb-2">Phone Number</label>
                <input 
                  type="text" 
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-white border border-dark/20 p-3 rounded text-dark focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. +91 98765 43210"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Event Type */}
          <div className="bg-white/50 border border-dark/10 p-6 rounded-lg shadow-sm">
            <h3 className="font-sans font-medium text-sm tracking-widest text-dark uppercase mb-4">Event Type</h3>
            <div className="relative">
              <select 
                value={eventType}
                onChange={handleEventTypeChange}
                className="w-full bg-white border border-dark/20 p-3 rounded text-dark focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                {Object.keys(PRICING).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-dark/50">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Section 3: Select Services */}
          <div className="bg-white/50 border border-dark/10 p-6 rounded-lg shadow-sm">
            <h3 className="font-sans font-medium text-sm tracking-widest text-dark uppercase mb-4">Select Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentServices.map(service => {
                const isSelected = selectedServices.includes(service.name);
                return (
                  <label 
                    key={service.name}
                    className={clsx(
                      "cursor-pointer p-4 border rounded transition-all flex items-center justify-between",
                      isSelected 
                        ? "border-primary bg-primary text-cream shadow-md" 
                        : "border-dark/10 bg-white hover:border-primary/50 text-dark"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={clsx(
                        "w-5 h-5 border flex items-center justify-center rounded-sm flex-shrink-0 transition-colors",
                        isSelected ? "border-cream bg-cream text-primary" : "border-dark/30 bg-transparent"
                      )}>
                        {isSelected && <span className="text-xs font-bold">✓</span>}
                      </div>
                      <span className="font-medium text-sm">{service.name}</span>
                    </div>
                    <span className={clsx("font-serif text-lg", isSelected ? "text-cream" : "text-primary")}>
                      {formatCurrency(service.price)}
                    </span>
                    
                    <input 
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleServiceToggle(service.name)}
                      className="sr-only"
                    />
                  </label>
                )
              })}
            </div>
          </div>
          
          {/* Section 6: Notes */}
          <div className="bg-white/50 border border-dark/10 p-6 rounded-lg shadow-sm">
            <h3 className="font-sans font-medium text-sm tracking-widest text-dark uppercase mb-4">Notes</h3>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-white border border-dark/20 p-4 rounded text-dark focus:outline-none focus:border-primary transition-colors min-h-[100px] resize-y"
              placeholder="Add any special requirements or package notes..."
            ></textarea>
          </div>

        </div>

        {/* RIGHT COLUMN: Sticky Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-dark text-cream rounded-lg p-6 shadow-xl flex flex-col">
            
            <h3 className="font-serif text-2xl mb-6 border-b border-cream/10 pb-4">Package Summary</h3>
            
            {/* Section 4: Selected Services Summary */}
            <div className="flex-grow">
              <h4 className="text-xs uppercase tracking-widest text-cream/50 mb-4 font-semibold">Selected Services</h4>
              
              {selectedServices.length === 0 ? (
                <p className="text-cream/50 font-light italic text-sm text-center py-8">No services selected yet.</p>
              ) : (
                <ul className="space-y-3 mb-8">
                  {selectedServices.map(serviceName => {
                    const service = currentServices.find(s => s.name === serviceName);
                    return (
                      <li key={serviceName} className="flex justify-between items-start text-sm">
                        <span className="font-light max-w-[180px]">{serviceName}</span>
                        <span className="font-serif">{service ? formatCurrency(service.price) : '---'}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            
            {/* Section 5: Final Price */}
            <div className="border-t border-cream/10 pt-6 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm tracking-wide text-cream/70 uppercase font-semibold">Calculated Total</span>
                <span className="font-serif text-xl">{formatCurrency(calculatedTotal)}</span>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm tracking-wide text-cream/70 uppercase font-semibold">Discount</span>
                <div className="relative w-1/2 max-w-[140px]">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee size={14} className="text-cream/70" />
                  </div>
                  <input 
                    type="number" 
                    min="0"
                    max={calculatedTotal}
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full bg-dark border border-cream/30 pl-8 pr-3 py-2 rounded text-cream focus:outline-none focus:border-cream focus:bg-cream/5 transition-all text-right font-serif text-lg"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="border-t border-cream/10 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-base tracking-wide text-cream uppercase font-bold">Final Package Price</span>
                  <span className="font-serif text-3xl">{formatCurrency(finalPackagePrice)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3">
              {!isPdfGenerated ? (
                <button 
                  onClick={handleGeneratePDF} 
                  className="w-full bg-dark hover:bg-dark/80 text-cream border border-cream/20 py-4 rounded text-sm uppercase tracking-widest transition-colors shadow-lg flex items-center justify-center gap-3 font-semibold"
                >
                  <Download size={18} /> Generate Package PDF
                </button>
              ) : (
                <>
                  <button 
                    onClick={handleDownloadPDF} 
                    className="w-full bg-dark hover:bg-dark/80 text-cream border border-cream/20 py-3 rounded text-sm uppercase tracking-widest transition-colors shadow-lg flex items-center justify-center gap-3 font-semibold"
                  >
                    <Download size={18} /> Download PDF
                  </button>
                  <button 
                    onClick={handleWhatsAppShare} 
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 rounded uppercase tracking-widest transition-colors shadow-lg flex items-center justify-center gap-3 font-semibold"
                  >
                    <MessageCircle size={18} /> Send PDF via WhatsApp
                  </button>
                </>
              )}
              <button 
                onClick={handleClear} 
                className="w-full bg-transparent border border-cream/20 hover:bg-cream/5 text-cream py-3 rounded text-sm uppercase tracking-widest transition-colors"
              >
                Clear Form
              </button>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default PackageCalculator;
