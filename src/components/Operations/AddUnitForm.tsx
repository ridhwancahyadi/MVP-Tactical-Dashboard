import React, { useState } from 'react';
import { Save, X, Car, Plane, Ship, User, Hash, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AddUnitForm = ({ onCancel, onSave }: { onCancel: () => void, onSave: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Land',
    status: 'Active',
    operator: '',
    identifier: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to backend
    console.log('Saving unit:', formData);
    onSave();
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-[#0a0c10] p-6">
      <div className="w-full max-w-2xl bg-[#1a1d24] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-black/20">
          <div>
            <h2 className="text-lg font-bold text-white">Add New Unit</h2>
            <p className="text-xs text-gray-400">Register a new asset to the fleet management system</p>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Unit Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Unit Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/30 border border-white/10 rounded px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors pl-10"
                  placeholder="e.g. Tactical Rover Alpha"
                />
                <Activity className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Identifier */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">ID / Plate Number</label>
              <div className="relative">
                <input 
                  type="text" 
                  required
                  value={formData.identifier}
                  onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                  className="w-full bg-black/30 border border-white/10 rounded px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors pl-10"
                  placeholder="e.g. B 1234 XYZ"
                />
                <Hash className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Type Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Unit Type</label>
              <div className="grid grid-cols-3 gap-2">
                {['Land', 'Air', 'Sea'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({...formData, type})}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 p-3 rounded border transition-all",
                      formData.type === type 
                        ? "bg-blue-600/20 border-blue-500 text-white" 
                        : "bg-black/30 border-white/5 text-gray-500 hover:bg-white/5"
                    )}
                  >
                    {type === 'Land' && <Car className="w-5 h-5" />}
                    {type === 'Air' && <Plane className="w-5 h-5" />}
                    {type === 'Sea' && <Ship className="w-5 h-5" />}
                    <span className="text-xs font-bold">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Status Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Initial Status</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors appearance-none"
              >
                <option value="Active">Active</option>
                <option value="Standby">Standby</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            {/* Operator */}
            <div className="space-y-2 col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Assigned Operator</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={formData.operator}
                  onChange={(e) => setFormData({...formData, operator: e.target.value})}
                  className="w-full bg-black/30 border border-white/10 rounded px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors pl-10"
                  placeholder="Officer Name"
                />
                <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2 col-span-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Operational Notes</label>
              <textarea 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full bg-black/30 border border-white/10 rounded px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none transition-colors h-24 resize-none"
                placeholder="Additional details about the unit configuration or mission assignment..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button 
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded transition-colors"
            >
              <Save className="w-4 h-4" />
              Register Unit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
