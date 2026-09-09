'use client';

import { useState, useRef } from 'react';
import { useUser, PRESET_AVATARS } from '@/context/UserContext';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  User,
  Mail,
  Briefcase,
  Building2,
  Camera,
  Upload,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  LogOut,
  SlidersHorizontal,
  Link2,
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, updateProfile, uploadAvatar, selectPresetAvatar, logout } = useUser();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [company, setCompany] = useState(user.company);
  const [customUrl, setCustomUrl] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    updateProfile({ name, email, role, company });
    setTimeout(() => {
      setIsSaving(false);
      setToastMsg('Profile information updated successfully!');
      setTimeout(() => setToastMsg(''), 3000);
    }, 400);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const result = await uploadAvatar(file);
        setIsUploading(false);
        setToastMsg('Profile picture uploaded successfully!');
        // Reset file input value so re-selecting same file works
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setTimeout(() => setToastMsg(''), 3000);
      } catch (err) {
        setIsUploading(false);
        alert('Failed to process image file. Please select a valid JPG or PNG image.');
      }
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      selectPresetAvatar(customUrl.trim());
      setToastMsg('Profile picture URL applied!');
      setCustomUrl('');
      setTimeout(() => setToastMsg(''), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="blue">User Account & Settings</Badge>
            <span className="text-xs text-slate-400 font-mono">Session ID: {user.id}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Profile Settings
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Manage your personal profile, role specifications, and avatar picture preferences.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/prediction">
            <Button variant="outline" size="sm" icon={<SlidersHorizontal className="w-4 h-4" />}>
              Launch Predictor
            </Button>
          </Link>
          <Button variant="danger" size="sm" onClick={logout} icon={<LogOut className="w-4 h-4" />}>
            Sign Out
          </Button>
        </div>
      </div>

      {/* Success Notification Toast */}
      {toastMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          {toastMsg}
        </div>
      )}

      {/* Main Grid: Avatar Card & Profile Form */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Avatar Picture Uploader & Presets */}
        <div className="md:col-span-5 space-y-6">
          <Card className="text-center space-y-4">
            <CardHeader className="mb-0">
              <CardTitle className="text-base flex items-center justify-center gap-2">
                <Camera className="w-4 h-4 text-brand-600" />
                Profile Picture
              </CardTitle>
            </CardHeader>

            {/* Current Avatar Image Preview */}
            <div className="relative inline-block mx-auto group">
              <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-brand-500/20 dark:ring-brand-400/20 shadow-lg mx-auto bg-slate-100 dark:bg-slate-800">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Quick Camera Overlay Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-md transition-transform active:scale-95 cursor-pointer"
                title="Upload new photo from your device"
              >
                <Camera className="w-4 h-4" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* User Short Info */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{user.name}</h2>
              <p className="text-xs text-slate-500 font-mono">{user.email}</p>
              <Badge variant="blue" className="mt-2 font-medium">
                {user.role}
              </Badge>
            </div>

            {/* Custom Upload Button */}
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                icon={<Upload className="w-3.5 h-3.5" />}
              >
                {isUploading ? 'Uploading Image...' : 'Upload Image File'}
              </Button>
            </div>

            {/* Paste Image URL Form */}
            <form onSubmit={handleApplyUrl} className="pt-2">
              <div className="flex items-center gap-1.5">
                <div className="relative flex-1">
                  <Link2 className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="url"
                    placeholder="Or paste image URL..."
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-[11px] rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
                <Button type="submit" variant="secondary" size="sm" className="text-[11px] px-2.5 py-1.5 h-auto">
                  Apply
                </Button>
              </div>
            </form>

            {/* Preset Avatars Grid */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <p className="text-xs font-semibold text-slate-500">Or Choose a Preset Avatar:</p>
              <div className="grid grid-cols-6 gap-2">
                {PRESET_AVATARS.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectPresetAvatar(url)}
                    className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${
                      user.avatar === url
                        ? 'border-brand-600 ring-2 ring-brand-500/30 scale-110'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Profile Edit Form */}
        <div className="md:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-brand-600" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your account details and organization metadata.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSave} className="space-y-4 pt-2">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {/* Job Title / Role */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Job Title / Role
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Lead Data Strategist"
                    className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {/* Company / Organization */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Organization / Company
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Analytics"
                    className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <Button type="submit" disabled={isSaving} icon={<CheckCircle2 className="w-4 h-4" />}>
                  {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
