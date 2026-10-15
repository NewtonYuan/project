// Guest information supplied in Wedding Website Planning.pdf.
export const navigation = [
  { label: 'About us', href: '#about' },
  { label: 'Our team', href: '#team' },
  { label: 'The day', href: '#the-day' },
  { label: 'Venue', href: '#venue' },
  { label: 'FAQs', href: '#questions' },
  { label: 'RSVP', href: '#rsvp' },
]

export const schedule = [
  { title: 'Arrival', time: '2:30 pm' },
  { title: 'Ceremony', time: '3:00 pm' },
  { title: 'Photos', time: '4:00 pm' },
  { title: 'Reception', time: '5:45 pm' },
  { title: 'Speeches', time: '7:30 pm' },
  { title: 'Partying', time: '8:00 pm' },
]

export const weddingParty = [
  { name: 'Mason', role: 'Best Man', photo: '/images/mason.png' },
  { name: 'Angus', role: 'Groomsman', photo: '/images/angus.png' },
  { name: 'Kevin', role: 'Groomsman', photo: '/images/kevin.png' },
  { name: 'Deborah', role: 'Maid of Honour', photo: '/images/deborah.jpg' },
  { name: 'Nadi', role: 'Bridesmaid', photo: '/images/nadi.jpg' },
  { name: 'Phoebe', role: 'Bridesmaid', photo: '/images/phoebe.jpg' },
]

export const loveStories: Record<string, string[]> = {
  Annie: [
    'Fun fact: Newton and I met at a social club event, and the event was literally to bond over food.',
    "Although we didn't speak much that day (busy eating - jk), we somehow managed to start messaging each other a lot and went on more food outings :P",
    "At first, I wasn't sure about dating someone younger, but Newton gets a special exception. He's shown me time and time again how loving, caring and supportive one can be. I love him with all my heart, and I can't wait to share life's adventures with him.",
  ],
  Newton: [
    'I met Annie at a University event, and I was allocated to the group which she was in.',
    'I remember seeing her in my group and thinking: "Oo lala"',
    "I know people say it's cliche but it really was love at first sight (though she didn't know that until a year after we started dating)",
    "Getting her to agree to be mine wasn't easy either, there were lots of hurdles and challenges that I had to overcome, but I am forever grateful that I did try my best, because she's the most perfect girl I've ever seen.",
  ],
}

export const questions = [
  { question: 'When should I arrive?', answer: [
    'Our ceremony will begin at 3:00 pm. We welcome guests to arrive between 2:30 pm and 3:00 pm to allow plenty of time to park, settle in and find a seat before the ceremony begins.',
  ] },
  { question: 'What should I wear?', answer: [
    'We’d love for our guests to dress in cocktail or semi-formal attire. For some outfit inspiration and more information on the dress code, take a look at The Day section of our website.',
  ], link: { href: '#dress-code', label: 'See the dress code' } },
  { question: 'Can I bring an extra guest or children?', answer: [
    'As much as we’d love to celebrate with everyone, our venue has a limited capacity and we’re keeping our wedding to those personally invited.',
    'Please refer to your invitation or RSVP details for the guests included in your invitation. We kindly ask that additional guests or children are not brought unless they have been specifically invited.',
    'Thank you for understanding and helping us keep our celebration intimate with our closest family and friends.',
  ] },
  { question: 'Where is the venue?', answer: [
    'We’ll be at Markovina Vineyard Estate, 84 Old Railway Road, Kumeū, Auckland 0892.',
    'You can pan and zoom the map on our website, or open it in Google Maps for directions from your location.',
  ], link: { href: '#location', label: 'See the venue map' } },
  { question: 'Will there be parking and transport?', answer: [
    'There is plenty of complimentary parking available on-site, with space for up to 100 cars.',
    'Guests will need to arrange their own transport to and from the venue. If you’re planning on drinking, please organise a responsible driver so everyone can get home safely.',
  ] },
  { question: 'Can you accommodate dietary requirements?', answer: [
    'Please let us know about your dietary requirements or allergies using the RSVP form.',
  ] },
  { question: 'Is there a gift registry?', answer: [
    'Your presence is more than enough, and we’re grateful to have you celebrating with us.',
    'For those who would still like to give a gift, we prefer a monetary contribution rather than physical gifts. A wishing well will be available at the venue for cards and red envelopes.',
    'We’ll also provide an option for those who prefer to make a digital contribution closer to the day.',
  ] },
  { question: 'How do I RSVP?', answer: [
    'You can RSVP using the form at the bottom of this page. Please let us know whether you’ll be attending and include any dietary requirements we should be aware of.',
    'Each guest should submit their own RSVP.',
    'The RSVP form will let you know when responses are open, and we’ll add the final RSVP deadline once confirmed.',
  ], link: { href: '#rsvp', label: 'Go to RSVP' } },
  { question: 'Who should I contact on the day?', answer: [
    'Before the wedding: feel free to reach out to Newton or Annie through your usual method of contact if you have any questions leading up to the day.',
    'On the wedding day: we’ll probably be a little busy getting married! For any questions or help on the day, please contact Mason — Best Man, or Deborah — Maid of Honour.',
  ], link: { href: '#team', label: 'Meet our team' } },
]
