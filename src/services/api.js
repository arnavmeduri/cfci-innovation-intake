/**
 * API Service for CFCI Innovation Intake
 * Handles all communication with the FastAPI backend
 */

// Use empty string to leverage Vite's proxy, or fallback to localhost for direct API calls
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Chat API
 */
export const chatAPI = {
  /**
   * Get initial greeting message
   */
  getGreeting: async () => {
    return fetchAPI('/api/chat/greeting');
  },

  /**
   * Send a message in simple/guest mode (no auth required)
   */
  sendMessage: async (message, conversationId = null) => {
    return fetchAPI('/api/chat/simple', {
      method: 'POST',
      body: JSON.stringify({
        message,
        conversation_id: conversationId,
      }),
    });
  },

  /**
   * Initiate a new conversation for authenticated users
   * Returns conversation_id and initial message
   */
  initiate: async (token) => {
    return fetchAPI('/api/chat/initiate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  /**
   * Advance an existing conversation for authenticated users
   * Sends message and gets AI response
   */
  advance: async (token, conversationId, message, messageStepNum) => {
    return fetchAPI('/api/chat/advance', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        conversation_id: conversationId,
        user_message: message,
        message_step_num: messageStepNum,
      }),
    });
  },
};

/**
 * Auth API
 */
export const authAPI = {
  /**
   * Register a new user
   */
  register: async (email, password, firstname, lastname) => {
    return fetchAPI('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        firstname,
        lastname,
      }),
    });
  },

  /**
   * Login user
   */
  login: async (email, password) => {
    return fetchAPI('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
  },
};

/**
 * Health check
 */
export const healthAPI = {
  check: async () => {
    return fetchAPI('/api/health');
  },
};

export default {
  chat: chatAPI,
  auth: authAPI,
  health: healthAPI,
};

