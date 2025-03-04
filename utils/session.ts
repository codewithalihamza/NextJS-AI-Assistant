export const getSessionId = (): string | null => {
  return localStorage.getItem("sessionId");
};

export const setSessionId = (sessionId: string): void => {
  localStorage.setItem("sessionId", sessionId);
};
