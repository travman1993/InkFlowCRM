import { useState } from 'react';

export function useArtistSettings() {
  const [settings, setSettings] = useState({
    paymentModel: 'booth_rent', // 'booth_rent' or 'commission'
    boothRentAmount: 800, // Monthly booth rent
    commissionRate: 0.60, // 60% if commission-based (artist keeps 60%, studio gets 40%)
    name: 'Your Name',
    studioName: '',
    phone: '',
    email: ''
  });

  // Update settings
  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings });
  };

  // Calculate artist earnings based on payment model
  const calculateArtistEarnings = (tattooPrice, suppliesCost) => {
    if (settings.paymentModel === 'booth_rent') {
      // Booth rent: Artist keeps 100% minus supplies
      return tattooPrice - suppliesCost;
    } else {
      // Commission: Artist gets X%, then minus supplies
      return (tattooPrice * settings.commissionRate) - suppliesCost;
    }
  };

  // Calculate studio cut (only for commission model)
  const calculateStudioCut = (tattooPrice) => {
    if (settings.paymentModel === 'commission') {
      return tattooPrice * (1 - settings.commissionRate);
    }
    return 0;
  };

  return {
    settings,
    updateSettings,
    calculateArtistEarnings,
    calculateStudioCut
  };
}