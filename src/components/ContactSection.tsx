import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Send, CheckCircle2, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CONTRACTOR_INFO } from '../data/contractorData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    service: 'Kitchen Remodel',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          zipCode: formData.city,
          projectType: formData.service,
          description: formData.message,
          timeline: 'Ready to discuss',
        }),
      });

      setIsSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 50,
        origin: { y: 0.7 },
      });
    } catch (err) {
      console.error(err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Direct Contractor Communication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Connect Directly with Ben
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            No call centers. No commissioned salespeople. You speak directly with Ben, owner and licensed general contractor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Contractor Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Direct Call Hero Card */}
            <div className="bg-slate-900 rounded-2xl p-7 text-white shadow-xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>{CONTRACTOR_INFO.licenseNumber}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Call or Text Ben Directly
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                Have questions about design, blueprints, city permits, or project feasibility? Reach out anytime:
              </p>

              <div className="my-6">
                <a
                  href={`tel:${CONTRACTOR_INFO.phoneRaw}`}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-lg sm:text-xl shadow-lg transition-all"
                >
                  <Phone className="w-6 h-6 fill-white" />
                  <span>{CONTRACTOR_INFO.phoneDisplay}</span>
                </a>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Headquartered in Orange County, CA</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{CONTRACTOR_INFO.workingHours}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Quick response for free on-site bids</span>
                </div>
              </div>
            </div>

            {/* Credibility Guarantee Callout */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Contractor Transparency Promise
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every BK Construction project is protected by California CSLB bond #1139587, full comprehensive liability coverage, and detailed written contracts with milestones tied to signed city inspection approvals.
              </p>
            </div>

          </div>

          {/* Right: Quick Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-md">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Message Sent to Ben!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out. Ben will review your project details and contact you at <strong className="text-slate-900">{formData.phone}</strong> promptly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        city: '',
                        service: 'Kitchen Remodel',
                        message: '',
                      });
                    }}
                    className="px-5 py-2 text-xs font-bold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Send Ben a Direct Note
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill in your details below and Ben will get back to you within 24 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Robert Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(714) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="robert@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Orange County City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anaheim, Irvine, Newport"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Primary Service Needed
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                  >
                    <option value="Kitchen Remodel">Kitchen Remodel (Cabinets, Countertops, Layout)</option>
                    <option value="Bathroom Renovation">Bathroom Renovation (Walk-in Shower, Tub, Vanity)</option>
                    <option value="Room Addition">Room Addition / ADU Expansion</option>
                    <option value="Custom Deck">Custom Deck & Patio (Composite or Redwood)</option>
                    <option value="Whole Home Repair">Whole Home Improvement & Structural Repair</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Tell Ben About Your Project
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe what you want to achieve, your rough timeline, or any specific questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.phone}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <span>Sending note to Ben...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message to Ben</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-slate-500 mt-2">
                    🔒 Direct contractor dispatch. We will never share or sell your contact info.
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
