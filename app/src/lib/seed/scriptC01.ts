export interface ScriptTurn {
  id: string; // e.g. A1, A2 ... A16
  speaker: 'bot' | 'sunita';
  textHi: string;
  textEn: string;
  timestamp: string;
  extractedFact?: {
    category: 'skill' | 'experience' | 'barrier' | 'limit';
    fact: string;
    unitCode?: string;
  };
}

export const SCRIPT_C01_TURNS: ScriptTurn[] = [
  {
    id: 'A1',
    speaker: 'bot',
    textHi: 'नमस्ते! हुनर लाइन में आपका स्वागत है। आपका क्या नाम है और आप किस गाँव से हैं?',
    textEn: 'Namaste! Welcome to Hunar Line. What is your name and which village are you from?',
    timestamp: '00:04',
  },
  {
    id: 'A2',
    speaker: 'sunita',
    textHi: 'मेरा नाम सुनीता है, मैं देवगांव उत्तर टोला में रहती हूँ।',
    textEn: 'My name is Sunita, I live in Devgaon North tola.',
    timestamp: '00:10',
    extractedFact: {
      category: 'experience',
      fact: 'Location: Devgaon North, Devgaon Cluster',
    },
  },
  {
    id: 'A3',
    speaker: 'bot',
    textHi: 'सुनीता जी, आप सिलाई का काम कब से कर रही हैं?',
    textEn: 'Sunita ji, how long have you been doing tailoring work?',
    timestamp: '00:15',
  },
  {
    id: 'A4',
    speaker: 'sunita',
    textHi: 'मैं पिछले सात साल से घर पर अपनी काली उषा मशीन से सिलाई कर रही हूँ।',
    textEn: 'I have been stitching at home on my black Usha machine for 7 years.',
    timestamp: '00:23',
    extractedFact: {
      category: 'skill',
      fact: '7 years sewing machine operation on domestic machine',
      unitCode: 'AMH/N1947-3',
    },
  },
  {
    id: 'A5',
    speaker: 'bot',
    textHi: 'आप किस तरह के कपड़े सिलती हैं?',
    textEn: 'What kinds of garments do you stitch?',
    timestamp: '00:29',
  },
  {
    id: 'A6',
    speaker: 'sunita',
    textHi: 'ब्लाउज़, सलवार सूट, फॉल-पीको, और बच्चों के स्कूल ड्रेस सिलती हूँ।',
    textEn: 'Blouses, salwar suits, fall-pico, and school frocks.',
    timestamp: '00:38',
    extractedFact: {
      category: 'skill',
      fact: 'Garment assembly: blouses, suits, school uniforms',
      unitCode: 'AMH/N1947-3',
    },
  },
  {
    id: 'A7',
    speaker: 'bot',
    textHi: 'नाप और कटाई कैसे करती हैं?',
    textEn: 'How do you do measurement and cutting?',
    timestamp: '00:44',
  },
  {
    id: 'A8',
    speaker: 'sunita',
    textHi: 'इंच-टेप से नाप लेती हूँ, चाक से निशान लगाकर कैंची से कटिंग करती हूँ।',
    textEn: 'I measure with inch-tape, mark margins with chalk, and cut with shears.',
    timestamp: '00:53',
    extractedFact: {
      category: 'skill',
      fact: 'Body measurements & chalk pattern cutting',
      unitCode: 'AMH/N1947-1',
    },
  },
  {
    id: 'A9',
    speaker: 'bot',
    textHi: 'सिलाई के बाद फिनिशिंग और फिटिंग कैसे देखती हैं?',
    textEn: 'How do you handle finishing and fitting after stitching?',
    timestamp: '00:59',
  },
  {
    id: 'A10',
    speaker: 'sunita',
    textHi: 'तुरपाई करती हूँ, कोयले वाली इस्त्री से प्रेस करती हूँ। ढीला-टाइट हो तो ठीक करती हूँ।',
    textEn: 'I do hand hemming, press with iron, and alter side seams for fit correction.',
    timestamp: '01:09',
    extractedFact: {
      category: 'skill',
      fact: 'Finishing, pressing & bespoke alterations',
      unitCode: 'AMH/N1947-4',
    },
  },
  {
    id: 'A11',
    speaker: 'bot',
    textHi: 'क्या आपके पास कोई सरकारी प्रमाण पत्र या सर्टिफिकेट है?',
    textEn: 'Do you hold any government certificate or official diploma?',
    timestamp: '01:16',
  },
  {
    id: 'A12',
    speaker: 'sunita',
    textHi: 'नहीं, मैंने किसी सेंटर से ट्रेनिंग नहीं ली। कोई कागज़ नहीं है।',
    textEn: 'No, I never attended any training centre. I have no certificate.',
    timestamp: '01:24',
    extractedFact: {
      category: 'barrier',
      fact: 'Barrier: Lacks formal certification despite 7 years skill',
    },
  },
  {
    id: 'A13',
    speaker: 'bot',
    textHi: 'महीने में कितना काम मिल पाता है?',
    textEn: 'How much work do you manage to get each month?',
    timestamp: '01:31',
  },
  {
    id: 'A14',
    speaker: 'sunita',
    textHi: 'काम बहुत कम है। कभी 3-4 सूट आते हैं, कभी कुछ नहीं। पड़ोसियों पर ही निर्भर हूँ।',
    textEn: 'Work is very sporadic. Sometimes 3-4 suits, sometimes nothing. Dependent only on neighbours.',
    timestamp: '01:42',
    extractedFact: {
      category: 'barrier',
      fact: 'Barrier: Customer access & lack of aggregated market demand',
    },
  },
  {
    id: 'A15',
    speaker: 'bot',
    textHi: 'अगर बड़ा काम मिले तो क्या आप रोज़ वाराणसी शहर जा सकती हैं?',
    textEn: 'If bigger work is available, can you travel daily to Varanasi city?',
    timestamp: '01:50',
  },
  {
    id: 'A16',
    speaker: 'sunita',
    textHi: 'नहीं, बच्चे दोपहर दो बजे स्कूल से आते हैं। आधे घंटे से दूर नहीं जा सकती।',
    textEn: 'No, children return from school at 2 PM. I cannot travel farther than 30 minutes.',
    timestamp: '02:00',
    extractedFact: {
      category: 'limit',
      fact: 'Hard limit: Max travel 30 mins (Cluster-bound)',
    },
  },
];
