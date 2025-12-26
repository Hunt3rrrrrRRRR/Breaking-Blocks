
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Palette as PaletteIcon, Plus, X, RotateCcw } from 'lucide-react';
import { Palette } from '../types';

interface PaletteManagerProps {
  palette: Palette;
  isVisible: boolean;
  onUpdatePalette: (newPalette: Palette) => void;
  onResetPalette: () => void;
}

export const PaletteManager: React.FC<PaletteManagerProps> = ({ 
  palette, 
  isVisible, 
  onUpdatePalette, 
  onResetPalette 
}) => {
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleAddColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value.toUpperCase();
    if (!palette.includes(newColor)) {
      onUpdatePalette([...palette, newColor]);
    }
  };

  const handleRemoveColor = (index: number) => {
    const newPalette = palette.filter((_, i) => i !== index);
    onUpdatePalette(newPalette);
  };

  return (
    <div 
      className={`
        fixed left-4 top-24 bottom-24 w-64 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-slate-100 p-6 flex flex-col z-40 transition-all duration-500 ease-in-out transform
        ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-[120%] opacity-0 pointer-events-none'}
      `}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
            <PaletteIcon size={20} />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-800">Color Palette</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Colors</p>
          </div>
        </div>
        <button 
          onClick={onResetPalette}
          className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
          title="Reset to defaults"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid grid-cols-4 gap-3">
          {palette.map((color, idx) => (
            <div key={`${color}-${idx}`} className="group relative">
              <div 
                className="w-full aspect-square rounded-full border-2 border-slate-200 shadow-sm cursor-help transition-transform hover:scale-110"
                style={{ backgroundColor: color }}
                title={color}
              />
              <button 
                onClick={() => handleRemoveColor(idx)}
                className="absolute -top-1 -right-1 bg-white text-slate-400 rounded-full p-0.5 shadow-md border border-slate-100 opacity-0 group-hover:opacity-100 hover:text-rose-500 transition-all"
              >
                <X size={10} strokeWidth={3} />
              </button>
            </div>
          ))}
          
          <button 
            onClick={() => colorInputRef.current?.click()}
            className="w-full aspect-square rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50 transition-all"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <input 
        ref={colorInputRef}
        type="color"
        className="hidden"
        onChange={handleAddColor}
      />

      <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <p className="text-[10px] font-bold text-slate-500 leading-tight">
          Gemini will prioritize these colors when generating or rebuilding your scenes.
        </p>
      </div>
    </div>
  );
};
