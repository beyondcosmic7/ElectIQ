export const ELECTION_STEPS = [
  {
    id: 'voter-registration',
    title: 'Get Your Voter ID',
    subtitle: 'Sign up to vote',
    phase: 1,
    icon: 'app_registration',
    color: '#3B5BDB',
    estimatedTime: 'Takes 10 mins online',
    checklistKeys: ['voter-registration', 'verify-voter-id'],
    shortDescription: 'Apply for your Voter ID card online. You need this to vote!',
    fullDescription: `The very first step is making sure your name is on the official voter list. Getting a Voter ID (also called an EPIC card) is easy and can be done from your phone.
    
If you are 18 or older, you can apply right now. Once your application is checked by a local officer, you will get your Voter ID card delivered to your home. You can also download a digital copy on your phone!`,
    eligibility: [
      'Are you an Indian citizen?',
      'Are you 18 years old or older?',
      'Do you live at your current address?',
    ],
    keyDates: {
      lastDate: 'Apply at least 2 months before voting day',
      enrollmentPeriod: 'You can apply any time of the year!',
    },
    steps: [
      'Go to voters.eci.gov.in or download the Voter Helpline App',
      'Fill out "Form 6" to register as a new voter',
      'Upload a selfie, your Aadhaar, and a light bill or rent agreement',
      'Track your status online using your reference number',
      'Download your digital Voter ID once approved'
    ],
    image: {
      url: '/images/ai_voters_line.png',
      alt: 'Voter Queue',
      caption: 'The voter registration process is your first step to the queue.'
    },
    documents: [
      'Age proof: Aadhaar card, Birth certificate, or 10th marksheet',
      'Address proof: Aadhaar, Bank passbook, or electricity bill',
      'A recent passport-size photo or selfie',
    ],
    faqs: [
      {
        q: 'Can I vote if I forgot to get my Voter ID?',
        a: 'No, your name MUST be on the voter list. Check your name online early so you don\'t miss out!',
      },
      {
        q: 'I moved to a new city for work. What do I do?',
        a: 'You can easily update your address online by filling out Form 8. You cannot vote in two different cities.',
      },
      {
        q: 'How do I check if my name is on the list?',
        a: 'Just type your details into the Voter Helpline App or call 1950.',
      },
    ],
    officialLinks: [
      { label: 'Register to Vote', url: 'https://voters.eci.gov.in' },
      { label: 'Download App', url: 'https://eci.gov.in/voter-helpline/' },
    ],
  },

  {
    id: 'election-announcement',
    title: 'Dates Announced',
    subtitle: 'When is voting day?',
    phase: 2,
    icon: 'campaign',
    color: '#7C3AED',
    estimatedTime: '1-2 months before voting',
    checklistKeys: ['know-your-constituency'],
    shortDescription: 'The Election Commission tells the country exactly when voting will happen in each state.',
    fullDescription: `The government body in charge of elections (the ECI) holds a press conference to announce the exact dates everyone will vote. 
    
As soon as the dates are announced, strict new rules called the "Model Code of Conduct" start immediately. This means the current government in power cannot launch new freebie schemes, promise new projects, or use government money to campaign. This keeps things fair for everyone!`,
    eligibility: [],
    keyDates: {
      mccStart: 'Rules start the same day dates are announced',
    },
    steps: [
      'The Election Commission announces voting dates on TV and news',
      'Strict fairness rules (Model Code of Conduct) begin for all politicians',
      'The police and voting officers start getting ready in your city'
    ],
    image: {
      url: '/images/ai_polling_officials.png',
      alt: 'Election Officials',
      caption: 'Strict rules begin to make sure the election is fair for everyone.'
    },
    documents: [],
    faqs: [
      {
        q: 'Why are strict rules needed right away?',
        a: 'It stops politicians who are currently in power from using police, government money, or new promises to unfairly cheat and win votes.',
      },
      {
        q: 'How many days will election voting take?',
        a: 'India is huge! So voting usually happens in 5 to 7 phases over a month. Your city will have one specific day to vote.',
      },
    ],
    officialLinks: [
      { label: 'Check Dates Here', url: 'https://eci.gov.in/elections/' },
    ],
  },

  {
    id: 'nominations',
    title: 'Candidates Sign Up',
    subtitle: 'Who is running in your area?',
    phase: 3,
    icon: 'how_to_reg',
    color: '#0891B2',
    estimatedTime: 'About a month before voting',
    checklistKeys: ['check-candidate-list'],
    shortDescription: 'Leaders officially sign up to be candidates in your local area.',
    fullDescription: `Any Indian citizen over 25 years old can decide to run for election! During this phase, leaders submit a form to say "I want to be a candidate."
    
They have to officially declare their wealth, education, and if they have any criminal police records. This information is made completely public so you know exactly who you are voting for! After a few days, the final list of names and party symbols (like a lotus, hand, or cycle) is locked in.`,
    eligibility: [
      'Must be an Indian citizen',
      'Must be 25 years or older',
      'Must have their own Voter ID',
    ],
    keyDates: {
      finalList: 'The final list is ready 2 weeks before voting day'
    },
    steps: [
      'Leaders fill out forms to become official candidates',
      'They deposit a small fee (₹25,000 for Lok Sabha)',
      'If someone changes their mind, they can cancel their name',
      'The Election Commission gives cool symbols to new parties',
      'The official list of names is printed and shared with the public!'
    ],
    documents: [],
    image: {
      url: '/images/ai_polling_officials.png',
      alt: 'Officials preparing records',
      caption: 'You can use the KYC app to see the records of your local leaders.'
    },
    faqs: [
      {
        q: 'How do I find out who is standing in my area?',
        a: 'You can search your area on the KYC app or use the "MyNeta" website. It will show you their photo, party, and background.',
      },
      {
        q: 'What is the NOTA button?',
        a: 'NOTA means "None Of The Above". If you don\'t like ANY of the leaders standing in your area, you press NOTA at the bottom of the machine.',
      },
    ],
    officialLinks: [
      { label: 'Check Candidate Details (MyNeta)', url: 'https://myneta.info' },
    ],
  },

  {
    id: 'campaign-period',
    title: 'The Campaign',
    subtitle: 'Rallies, speeches, and promises',
    phase: 4,
    icon: 'record_voice_over',
    color: '#EA580C',
    estimatedTime: '2-3 weeks',
    checklistKeys: [],
    shortDescription: 'Leaders host rallies and go door-to-door asking for your vote.',
    fullDescription: `This is the loudest part of the election! Parties try to win your heart by hosting big rallies, handing out pamphlets, and making promises about what they will do if they win.
    
The Election Commission watches them very closely. Did you know a candidate is only allowed to spend a limited amount of money on ads and rallies? If they bribe voters with cash or gifts, they can be banned! 

Suddenly... exactly 48 hours before voting day, everything goes completely silent. No more rallies or loud speakers allowed! This is called the 'Silent Period'.`,
    eligibility: [],
    keyDates: {
      campaignEnd: 'Campaigning STOPS exactly 48 hours before voting',
    },
    steps: [
      'Politicians visit neighborhoods and do roadshows',
      'Officers check cars and buses to catch people illegally giving out free cash or liquor',
      'The voting machines (EVMs) arrive safely in your city',
      'All loud campaigning STOPS two days before voting'
    ],
    image: {
      url: '/images/ai_voters_line.png',
      alt: 'Crowd at a rally',
      caption: 'This is a great time to listen to promises, ask hard questions, and decide your vote!'
    },
    documents: [],
    faqs: [
      {
        q: 'What should I do if a politician offers me money or gifts to vote for them?',
        a: 'Say NO! It is illegal to take or give bribes. You can actually report them secretly through the cVIGIL app on your phone.',
      },
      {
        q: 'Why does everything go silent 48 hours before?',
        a: 'It gives your mind peace and quiet. Without loud ads and speeches, you can sit with your family and quietly decide who you trust the most to run your city.',
      },
    ],
    officialLinks: [],
  },

  {
    id: 'voting-day',
    title: 'Voting Day!',
    subtitle: 'Press the button, make your choice',
    phase: 5,
    icon: 'how_to_vote',
    color: '#16A34A',
    estimatedTime: 'Takes about 15 minutes at the booth',
    checklistKeys: ['find-polling-booth', 'carry-voter-id', 'cast-your-vote'],
    shortDescription: 'Go to your school or local hall, press the button on the machine, and cast your vote!',
    fullDescription: `Today is the big day! Voting usually starts at 7:00 AM and ends at 6:00 PM. **If you are standing in the line at 6:00 PM, you will still be allowed to vote, no matter how late it gets.**
    
When you walk in, an officer will check your ID. Then, another officer will put a dot of purple ink on your left finger. This ink doesn't wash off for weeks, proving you voted!

Finally, you go behind a cardboard screen to the voting machine (EVM). Press the blue button next to the name and symbol of the leader you like. You will hear a loud "BEEP" and see a paper slip print inside a glass window. That paper proves your vote was perfectly counted!`,
    eligibility: [],
    keyDates: {
      pollingHours: 'Usually 7:00 AM to 6:00 PM',
    },
    steps: [
      'Find your local voting booth on the internet or your voter slip',
      'Take your Aadhaar or Voter ID Card with you',
      'Stand in line inside the booth room (Phones are NOT allowed)',
      'An officer checks your ID and puts purple ink on your finger',
      'Walk to the machine, press the blue button for your choice',
      'Look into the glass window to see your vote printed on paper',
      'Walk out and show off your inked finger!'
    ],
    documents: [
      'Carry your Voter ID Card if you have it.',
      'If not! Carry your Aadhaar, PAN Card, Driving License, or Passport.',
    ],
    image: {
      url: '/images/ai_inked_finger.png',
      alt: 'Inked Finger',
      caption: 'Look inside the window! A paper slip prints to show you exactly who you voted for.'
    },
    faqs: [
      {
        q: 'My boss says I have to work and cannot vote. Is that allowed?',
        a: 'NO! The law says your boss must give you a paid holiday to go vote. They cannot stop you.',
      },
      {
        q: 'Can somebody hack the voting machine with Wifi?',
        a: 'No. The machines run on batteries and do not have Wifi, Bluetooth, or any internet parts inside them. They are like old calculators, making them impossible to hack remotely.',
      },
    ],
    officialLinks: [
      { label: 'Find Where To Vote', url: 'https://voters.eci.gov.in/polling-station' },
    ],
  },

  {
    id: 'vote-counting',
    title: 'Counting the Votes',
    subtitle: 'Who won?',
    phase: 6,
    icon: 'bar_chart',
    color: '#DC2626',
    estimatedTime: 'Starts at 8:00 AM on Results Day',
    checklistKeys: ['check-results'],
    shortDescription: 'All the machines are unlocked and the votes are counted live on TV!',
    fullDescription: `The voting machines are kept inside heavily guarded "Strong Rooms" with 24/7 CCTV cameras. 
    
On Results Day, the machines are brought into a big hall. People from EVERY political party sit at the tables to watch like hawks and make sure nobody cheats! The officers press a button on the machine, and it instantly shows how many votes everyone got.

The numbers are counted round by round. By the afternoon, the numbers are clear, and the winner is handed a big official paper certificate!`,
    eligibility: [],
    keyDates: {
      countingDay: 'Usually 1 to 3 days after the last voting day',
    },
    steps: [
      'Guards unlock the strong rooms in front of all politicians',
      'The machines are brought to counting tables',
      'Officers press the "Result" button on the machine',
      'They write the numbers on a board and put it on the internet',
      'The person with the most votes is announced the winner on TV!'
    ],
    image: {
      url: '/images/ai_election_celebration.png',
      alt: 'Counting day',
      caption: 'Party members watch very closely to make sure the counting is fair.'
    },
    documents: [],
    faqs: [
      {
        q: 'What if two leaders get the exact same amount of votes?',
        a: 'It is very rare! But if it happens, the winner is picked by a luck draw (like tossing a coin).',
      },
      {
        q: 'Where do I check who is winning in my city?',
        a: 'You can check it live on the election website or just turn on any news TV channel as they report the numbers live all day.',
      },
    ],
    officialLinks: [
      { label: 'Check Live Results', url: 'https://results.eci.gov.in' },
    ],
  },

  {
    id: 'government-formation',
    title: 'New Government',
    subtitle: 'The winner takes charge',
    phase: 7,
    icon: 'account_balance',
    color: '#0F172A',
    estimatedTime: 'A few days after results',
    checklistKeys: [],
    shortDescription: 'The political party winning the most seats gets to form the new government!',
    fullDescription: `In India, we don't just vote for one Prime Minister. We vote for local politicians across the whole country (543 seats in total). 
    
Whichever Political Party wins MORE THAN HALF of these seats (at least 272) is the winner!

The winning party gets together in Delhi, and they choose their leader. That leader is then sworn in as the new Prime Minister of India by the President. If no party wins half the seats, multiple smaller parties can join hands like a team to reach the magic number 272. This is called a "coalition".`,
    eligibility: [],
    keyDates: {
      swearingIn: 'Almost immediately after the win is clear.',
    },
    steps: [
      'The Election Commission gives the official winner list to the President',
      'The biggest party proves they have more than 272 winning leaders',
      'The party chooses someone to be their boss (The Prime Minister)',
      'The President makes them take an oath to protect the country',
      'The new Government starts their work the very next day!'
    ],
    image: {
      url: '/images/ai_election_celebration.png',
      alt: 'Parliament building',
      caption: 'The winning leaders travel to the Parliament in Delhi to run the country.'
    },
    documents: [],
    faqs: [
      {
        q: 'What is the magic number?',
        a: '272! Out of all 543 area seats in India, a party must win 272 to take control and make the PM.',
      },
      {
        q: 'Can smaller parties join together?',
        a: 'Yes! If nobody reaches 272 alone, smaller teams can merge together to reach the magic number and form the government.',
      },
    ],
    officialLinks: [],
  },
]

// Helper: get step by ID
export function getStepById(id) {
  return ELECTION_STEPS.find(step => step.id === id) || null
}

// Helper: get compact version for AI system prompt injection
export function getStepsForPrompt() {
  return ELECTION_STEPS.map(step => ({
    id: step.id,
    title: step.title,
    phase: step.phase,
    shortDescription: step.shortDescription,
    keyPoints: step.steps,
    faqs: step.faqs,
  }))
}
