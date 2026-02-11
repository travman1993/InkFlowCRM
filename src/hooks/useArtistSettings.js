import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export function useArtistSettings() {
  const { state, dispatch } = useAppContext();
  const { updateArtist } = useAuth();
  const { settings } = state;

  const updateSettings = async (newSettings) => {
    // Build the DB update (camelCase → snake_case)
    const dbUpdate = {};
    if (newSettings.name !== undefined) dbUpdate.name = newSettings.name;
    if (newSettings.studioName !== undefined) dbUpdate.studio_name = newSettings.studioName;
    if (newSettings.phone !== undefined) dbUpdate.phone = newSettings.phone;
    if (newSettings.email !== undefined) dbUpdate.email = newSettings.email;
    if (newSettings.paymentModel !== undefined) dbUpdate.pay_model = newSettings.paymentModel;
    if (newSettings.boothRentAmount !== undefined) dbUpdate.booth_rent_amount = newSettings.boothRentAmount;
    if (newSettings.commissionRate !== undefined) dbUpdate.commission_rate = newSettings.commissionRate;

    // Write to Supabase via AuthContext (updates artist table)
    const { error } = await updateArtist(dbUpdate);

    if (error) {
      console.error('Error updating settings:', error);
      return;
    }

    // Update local state
    dispatch({ type: 'UPDATE_SETTINGS', payload: newSettings });
  };

  const calculateArtistEarnings = (tattooPrice, suppliesCost) => {
    if (settings.paymentModel === 'booth_rent') {
      return tattooPrice - suppliesCost;
    } else {
      return (tattooPrice * settings.commissionRate) - suppliesCost;
    }
  };

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
    calculateStudioCut,
  };
}