export interface ContactLinks {
  linkedin?: string;
  email?: string;
}

export const site = {
  name: "Triet's Engineering Field Notes",
  description: 'Data, code, and everything in between.',
  githubUrl: 'https://github.com/trietle243',
  // Add only user-approved contact values. Missing links stay hidden.
  contact: {} as ContactLinks,
};
