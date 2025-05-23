import React, { useState } from 'react';
import { Mail, Link, Send, Copy, Check, X } from 'lucide-react';

const InviteMemberModal = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Member');
  const [inviteLink, setInviteLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [isSendingInvite, setIsSendingInvite] = useState(false);

  const generateInviteLink = () => {
    setIsGeneratingLink(true);
    // Simulate API call
    setTimeout(() => {
      const mockLink = `https://yourapp.com/invite?token=${Math.random().toString(36).substring(2, 15)}`;
      setInviteLink(mockLink);
      setIsGeneratingLink(false);
    }, 1000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const sendEmailInvite = () => {
    if (!email.trim()) return;
    
    setIsSendingInvite(true);
    // Simulate API call
    setTimeout(() => {
      setEmailSent(true);
      setIsSendingInvite(false);
      setTimeout(() => {
        setEmailSent(false);
        setEmail('');
      }, 2000);
    }, 1000);
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="space-y-6">
      {/* Email Invitation Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-gray-600" />
          <h3 className="text-sm font-medium text-gray-900">Send invitation via email</h3>
        </div>
        
        <div className="space-y-3">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 uppercase tracking-wide">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@company.com"
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="role" className="block text-xs font-medium text-gray-700 uppercase tracking-wide">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
          
          <button
            onClick={sendEmailInvite}
            disabled={!isValidEmail(email) || isSendingInvite || emailSent}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            {isSendingInvite ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            ) : emailSent ? (
              <>
                <Check className="w-4 h-4" />
                <span>Invitation sent!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send invitation</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500 font-medium tracking-wide">Or</span>
        </div>
      </div>

      {/* Generate Link Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Link className="w-4 h-4 text-gray-600" />
          <h3 className="text-sm font-medium text-gray-900">Generate invitation link</h3>
        </div>
        
        <p className="text-xs text-gray-600">
          Create a shareable link that anyone can use to join your project
        </p>
        
        {!inviteLink ? (
          <button
            onClick={generateInviteLink}
            disabled={isGeneratingLink}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            {isGeneratingLink ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                <span>Generating link...</span>
              </>
            ) : (
              <>
                <Link className="w-4 h-4" />
                <span>Generate invitation link</span>
              </>
            )}
          </button>
        ) : (
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-md border">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 font-mono break-all pr-2">
                  {inviteLink}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="flex-shrink-0 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                  title="Copy to clipboard"
                >
                  {linkCopied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                {linkCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy link</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => setInviteLink('')}
                className="px-3 py-2 border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                title="Generate new link"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Info Note */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-xs text-blue-800">
          <strong>Note:</strong> Invited members will have {role.toLowerCase()} access to this project. 
          You can change their permissions later from the team settings.
        </p>
      </div>
    </div>
  );
};

export default InviteMemberModal;