import { queryNonResidentSubmissions } from 'backend/kisi.js'; 

export const invoke = async ({ payload }) => {
  const email = payload.buyerEmail || payload.contact?.email;

  if (email) {
    await queryNonResidentSubmissions(email);
  } else {
    console.warn('No email found in payload');
  }

  return {}; 
};
