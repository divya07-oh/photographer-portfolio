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
  const [notes, setNotes] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [optionalDate, setOptionalDate] = useState('');
  
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
  }, [customerName, customerPhone, eventType, eventDate, optionalDate, selectedServices, notes]);

  const currentServices = PRICING[eventType] || [];

  const calculatedTotal = useMemo(() => {
    return selectedServices.reduce((total, serviceName) => {
      const service = currentServices.find(s => s.name === serviceName);
      return total + (service ? service.price : 0);
    }, 0);
  }, [selectedServices, currentServices]);

  const finalPackagePrice = calculatedTotal;

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

  const getDisplayName = (serviceName, currentEventType) => {
    if (currentEventType === 'Wedding' && serviceName.toLowerCase().includes('album')) {
      return `${serviceName} (Reception & Wedding)`;
    }
    return serviceName;
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
    if (!eventDate) {
      alert("Please select the event date.");
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
    
    // Theme Colors
    const primaryBurgundy = [90, 31, 43];
    const cream = [230, 210, 181];
    const creamLight = [240, 226, 204];
    const darkText = [36, 24, 26];
    
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    


    let currentY = 25;

    // Logo
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', (pageWidth / 2) - 15, currentY, 30, 30);
      currentY += 35;
    }
    
    // Brand Name
    doc.setFont("times", "bold");
    doc.setFontSize(28);
    doc.setTextColor(...primaryBurgundy);
    doc.text("The Marvelous Photography", pageWidth / 2, currentY, { align: "center" });
    currentY += 8;
    
    // Document Title
    doc.setFont("times", "italic");
    doc.setFontSize(14);
    doc.setTextColor(...darkText);
    doc.text("PHOTOGRAPHY PACKAGE QUOTATION", pageWidth / 2, currentY, { align: "center" });
    currentY += 15;

    // Separator line
    doc.setDrawColor(...cream);
    doc.setLineWidth(0.5);
    doc.line(20, currentY, pageWidth - 20, currentY);
    currentY += 10;

    // Customer Info Box
    doc.setFillColor(...creamLight);
    doc.rect(20, currentY, pageWidth - 40, 32, 'F');
    
    doc.setFontSize(11);
    doc.setTextColor(...darkText);
    doc.setFont("times", "bold");
    doc.text("Prepared For:", 25, currentY + 8);
    
    doc.setFont("helvetica", "normal");
    doc.text(customerName.trim(), 25, currentY + 14);
    doc.text(customerPhone.trim(), 25, currentY + 20);
    
    doc.setFont("times", "bold");
    doc.text("Event Type:", pageWidth / 2 + 10, currentY + 8);
    doc.setFont("helvetica", "normal");
    doc.text(eventType, pageWidth / 2 + 10, currentY + 14);
    
    doc.setFont("times", "bold");
    doc.text("Date:", pageWidth / 2 + 10, currentY + 20);
    doc.setFont("helvetica", "normal");
    const displayDate = eventDate ? new Date(eventDate).toLocaleDateString('en-IN') : new Date().toLocaleDateString('en-IN');
    let dateStr = displayDate;
    if (optionalDate) {
      dateStr += ` & ${new Date(optionalDate).toLocaleDateString('en-IN')}`;
    }
    doc.text(dateStr, pageWidth / 2 + 10, currentY + 26);
    
    currentY += 45;

    const pdfCurrency = (amount) => formatCurrency(amount).replace('₹', 'Rs. ');

    // Table data
    const tableBody = selectedServices.map(serviceName => {
      const service = currentServices.find(s => s.name === serviceName);
      const priceStr = service ? pdfCurrency(service.price) : '---';
      const displayName = getDisplayName(serviceName, eventType);
      return [displayName, priceStr];
    });

    // Add table
    autoTable(doc, {
      startY: currentY,
      head: [[
        { content: 'SELECTED SERVICES', styles: { halign: 'left' } },
        { content: 'PRICE', styles: { halign: 'right' } }
      ]],
      body: tableBody,
      theme: 'plain',
      headStyles: {
        fillColor: primaryBurgundy,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        font: 'times'
      },
      styles: {
        cellPadding: 8,
        fontSize: 11,
        font: 'helvetica',
        textColor: darkText,
        lineColor: cream,
        lineWidth: { bottom: 0.5 }
      },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { halign: 'right', cellWidth: 50, fontStyle: 'bold' }
      },
      margin: { left: 20, right: 20 }
    });

    currentY = doc.lastAutoTable.finalY + 5;

    // Final Price Table
    autoTable(doc, {
      startY: currentY + 2,
      body: [
        ['FINAL PACKAGE PRICE', pdfCurrency(finalPackagePrice)]
      ],
      theme: 'plain',
      styles: { 
        cellPadding: 8, 
        fontSize: 14, 
        textColor: [255, 255, 255],
        fillColor: primaryBurgundy,
        font: 'times'
      },
      columnStyles: {
        0: { halign: 'left', fontStyle: 'bold' },
        1: { halign: 'right', fontStyle: 'bold', cellWidth: 50 }
      },
      margin: { left: 20, right: 20 }
    });
    
    currentY = doc.lastAutoTable.finalY + 20;

    // Notes
    if (notes.trim()) {
      doc.setFontSize(12);
      doc.setFont("times", "bold");
      doc.setTextColor(...primaryBurgundy);
      doc.text("Additional Notes:", 20, currentY);
      
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor(...darkText);
      const splitNotes = doc.splitTextToSize(notes.trim(), pageWidth - 40);
      doc.text(splitNotes, 20, currentY + 8);
      currentY += 8 + (splitNotes.length * 5) + 10;
    }

    // Footer
    const footerY = Math.max(currentY + 15, pageHeight - 30);
    
    doc.setDrawColor(...cream);
    doc.setLineWidth(0.5);
    doc.line(20, footerY - 5, pageWidth - 20, footerY - 5);
    
    doc.setFontSize(11);
    doc.setFont("times", "italic");
    doc.setTextColor(...primaryBurgundy);
    doc.text("Thank you for choosing The Marvelous Photography for your special moments.", pageWidth / 2, footerY + 2, { align: "center" });
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 150, 150);
    doc.text("This is a computer-generated quotation and does not require a physical signature.", pageWidth / 2, footerY + 8, { align: "center" });
    
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
    setEventDate('');
    setOptionalDate('');
    setSelectedServices([]);
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

          {/* Section 2: Event Details */}
          <div className="bg-white/50 border border-dark/10 p-6 rounded-lg shadow-sm">
            <h3 className="font-sans font-medium text-sm tracking-widest text-dark uppercase mb-4">Event Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-dark/70 mb-2">Event Type</label>
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
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-dark/70 mb-2">Event Date</label>
                <input 
                  type="date" 
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-white border border-dark/20 p-3 rounded text-dark focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-dark/70 mb-2">Optional Date</label>
                <input 
                  type="date" 
                  value={optionalDate}
                  onChange={(e) => setOptionalDate(e.target.value)}
                  className="w-full bg-white border border-dark/20 p-3 rounded text-dark focus:outline-none focus:border-primary transition-colors"
                />
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
                      <span className="font-medium text-sm">{getDisplayName(service.name, eventType)}</span>
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
                        <span className="font-light max-w-[180px]">
                          {getDisplayName(serviceName, eventType)}
                        </span>
                        <span className="font-serif">{service ? formatCurrency(service.price) : '---'}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            
            {/* Section 5: Final Price */}
            <div className="border-t border-cream/10 pt-6 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-base tracking-wide text-cream uppercase font-bold">Final Package Price</span>
                <span className="font-serif text-3xl">{formatCurrency(finalPackagePrice)}</span>
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
