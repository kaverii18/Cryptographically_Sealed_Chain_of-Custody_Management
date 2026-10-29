/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  LayoutDashboard,
  Upload,
  FileCheck,
  ShieldCheck,
  Eye,
  Key,
  ChevronLeft,
  ChevronRight,
  Shield,
  X,
  Plus,
  RotateCcw,
} from 'lucide-react';
import { OfficerIdentity } from '../types/custody';

export type TabType = 'dashboard' | 'intake' | 'ledger' | 'verify' | 'stego' | 'keys';

interface NavItem {
  id: TabType;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  evidenceCount: number;
  officersCount: number;
  activeOfficer: OfficerIdentity | null;
  officers: OfficerIdentity[];
  onSelectOfficer: (id: string) => void;
  onResetData: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  evidenceCount,
  officersCount,
  activeOfficer,
  officers,
  onSelectOfficer,
  onResetData,
}) => {
  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      shortLabel: 'Dash',
      icon: LayoutDashboard,
      badge: evidenceCount > 0 ? evidenceCount : undefined,
    },
    {
      id: 'intake',
      label: 'Evidence Intake',
      shortLabel: 'Intake',
      icon: Upload,
    },
    {
      id: 'ledger',
      label: 'Chain of Custody',
      shortLabel: 'Chain',
      icon: FileCheck,
      badge: evidenceCount > 0 ? `${evidenceCount} Items` : undefined,
    },
    {
      id: 'verify',
      label: 'Forensic Verification',
      shortLabel: 'Verify',
      icon: ShieldCheck,
    },
    {
      id: 'stego',
      label: 'Steganography & Encryption',
      shortLabel: 'Stego',
      icon: Eye,
    },
    {
      id: 'keys',
      label: 'Actor Key Manager',
      shortLabel: 'Keys',
      icon: Key,
      badge: officersCount > 0 ? `${officersCount} Keys` : undefined,
    },
  ];

  const handleNavClick = (tab: TabType) => {
    onSelectTab(tab);
    if (isMobileOpen) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
        <div
          onClick={() => handleNavClick('dashboard')}
          className="flex items-center gap-3 cursor-pointer overflow-hidden group"
          title="Chain of Custody"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-500/20 transition-colors">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <div className="flex flex-col min-w-0 transition-opacity duration-200">
              <span className="text-sm font-bold tracking-tight text-white truncate">
                Chain of Custody
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400/90 font-medium">
                Cryptographic Seal
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobile}
          className="md:hidden flex items-center justify-center w-8 h-8 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Intake Button */}
      <div className="p-3 border-b border-slate-800/80 shrink-0">
        <button
          onClick={() => handleNavClick('intake')}
          className={`w-full flex items-center ${
            isCollapsed && !isMobileOpen ? 'justify-center px-0' : 'justify-start px-3'
          } py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors shadow-sm group relative`}
          title="New Evidence Intake"
        >
          <Plus className="w-4 h-4 shrink-0" />
          {(!isCollapsed || isMobileOpen) && (
            <span className="ml-2 font-medium tracking-wide">Intake Evidence</span>
          )}

          {/* Tooltip for collapsed mode */}
          {isCollapsed && !isMobileOpen && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none absolute left-full ml-3 px-2.5 py-1 bg-slate-950 text-white text-xs font-normal rounded border border-slate-700 whitespace-nowrap z-50 shadow-xl">
              New Evidence Intake
            </div>
          )}
        </button>
      </div>

      {/* Main Navigation List */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1.5 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;

          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center ${
                  isCollapsed && !isMobileOpen ? 'justify-center px-0' : 'justify-between px-3'
                } py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 font-semibold border-l-4 border-emerald-400 shadow-xs'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-emerald-400 scale-110' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  {(!isCollapsed || isMobileOpen) && (
                    <span className="truncate tracking-tight">{item.label}</span>
                  )}
                </div>

                {/* Badge if present and expanded */}
                {(!isCollapsed || isMobileOpen) && item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                      isActive
                        ? 'bg-emerald-500/30 text-emerald-200 font-medium'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>

              {/* Floating Tooltip in collapsed mode */}
              {isCollapsed && !isMobileOpen && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 bg-slate-950 text-white text-xs rounded border border-slate-700 whitespace-nowrap z-50 shadow-xl flex items-center gap-2">
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded font-mono">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Active Signer & Security Status Footer */}
      <div className="p-3 border-t border-slate-800 shrink-0 bg-slate-950/40">
        {/* Active Signer Selection */}
        {(!isCollapsed || isMobileOpen) ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Key className="w-3.5 h-3.5 text-emerald-400" />
                Active Signer
              </span>
              <button
                onClick={() => handleNavClick('keys')}
                className="text-[10px] text-emerald-400 hover:underline"
              >
                Manage
              </button>
            </div>
            <select
              aria-label="Active Signer Officer"
              value={activeOfficer?.id || ''}
              onChange={(e) => onSelectOfficer(e.target.value)}
              className="w-full bg-slate-800 text-white text-xs rounded px-2.5 py-1.5 border border-slate-700 focus:outline-none focus:border-emerald-500 font-mono"
            >
              {officers.map((off) => (
                <option key={off.id} value={off.id} className="bg-slate-900 text-white">
                  {off.name} ({off.badge})
                </option>
              ))}
            </select>

            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ECDSA P-256</span>
              </div>
              <button
                onClick={onResetData}
                title="Reset to default demo data"
                className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-rose-400 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 group relative">
            <button
              onClick={() => handleNavClick('keys')}
              className="w-8 h-8 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              title={`Active Signer: ${activeOfficer?.name || 'None'}`}
            >
              <Key className="w-4 h-4 text-emerald-400" />
            </button>
            {/* Tooltip for collapsed signer */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none absolute left-full bottom-0 ml-3 px-3 py-2 bg-slate-950 text-white text-xs rounded border border-slate-700 whitespace-nowrap z-50 shadow-xl">
              <div className="font-semibold text-slate-200">Active Signer:</div>
              <div className="text-emerald-400 text-[11px] font-mono">
                {activeOfficer?.name} ({activeOfficer?.badge})
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Click to manage keys</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer (Left Slide-in) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Fixed Left Sidebar */}
      <aside
        className={`hidden md:block fixed inset-y-0 left-0 z-30 transition-all duration-300 ease-in-out border-r border-slate-800 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
