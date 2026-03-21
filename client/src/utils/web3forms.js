const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const MISSING_KEY_MESSAGE =
  "Form service is not configured yet. Please add VITE_WEB3FORMS_ACCESS_KEY.";

const GENERIC_ERROR_MESSAGE =
  "We couldn't send your message right now. Please try again in a moment.";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return EMAIL_PATTERN.test(email);
}

export async function submitWeb3Form(formData) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();

  if (!accessKey) {
    return {
      success: false,
      message: MISSING_KEY_MESSAGE,
    };
  }

  formData.set("access_key", accessKey);

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      body: formData,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success) {
      return {
        success: false,
        message: data?.message || GENERIC_ERROR_MESSAGE,
      };
    }

    return {
      success: true,
      message: data.message || "Form submitted successfully.",
    };
  } catch {
    return {
      success: false,
      message: GENERIC_ERROR_MESSAGE,
    };
  }
}
