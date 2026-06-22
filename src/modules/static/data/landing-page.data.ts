export const landingPageData = {
  page: {
    hero: {
      badge: 'PLATFORM MODULES',
      title: {
        line1: 'NAVIGATE',
        line2: 'THE TECH',
        line3: 'FRONTIER.',
      },
      description:
        'SceaduCode is a holistic career platform engineered to accelerate your tech career via precision matching and AI synthesis.',
      buttons: [
        {
          id: 'init-session',
          label: 'INITIALIZE SESSION',
          type: 'primary',
          action: {
            type: 'route',
            value: '/session',
          },
          icon: 'arrow-up-right',
        },
        {
          id: 'career-guide',
          label: 'CAREER GUIDE',
          type: 'secondary',
          action: {
            type: 'route',
            value: '/career-guide',
          },
          icon: 'arrow-up-right',
        },
      ],
    },

    stats: [
      {
        id: 'roles',
        value: '12K+',
        label: 'ACTIVE ROLES',
      },
      {
        id: 'ats',
        value: '94%',
        label: 'ATS PASS RATE',
      },
      {
        id: 'placement',
        value: '3x',
        label: 'FASTER PLACEMENT',
      },
    ],

    modules: [
      {
        id: 'node-01',
        title: 'JOB MATCHING',
        description:
          'Match your tech stack with high-growth roles using vector AI.',
        icon: 'bolt',
        theme: 'light',
        statusBars: [40, 55, 48, 70, 52],
      },
      {
        id: 'node-02',
        title: 'MOCK INTERVIEWS',
        description:
          'Simulate hiring environments with adaptive feedback loops.',
        icon: 'terminal',
        theme: 'light',
        footerLabel: 'session_active',
      },
      {
        id: 'node-03',
        title: 'RESUME SYNC',
        description: 'AI-powered analysis calibrated for peak ATS performance.',
        icon: 'shield',
        theme: 'dark',
      },
    ],
  },
};
