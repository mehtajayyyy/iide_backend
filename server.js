const express = require('express');
const cors = require('cors');
const axios = require('axios');

const { heroSectionContent, digitalMarketingOverview, courseDetailsForm, upSkillSection, keyHighlights, campusImmersion, digitalMarketingTools, nextGenPowerTools, industryExperts, careerOpportunities, aluminisWorkAt, learningMethedology, supersessionsSection, testimonials, faqsSection, feesSection, ctaSection, comparisonPopup } = require('./src/contentGenerator');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// Define API routes
app.get('/api/content', (req, res) => {
  contentData = {
    'hero_section': heroSectionContent(),
    'digital_marketing_overview': digitalMarketingOverview(),
    'course_details_form': courseDetailsForm(),
    'upSkillsSection': upSkillSection(),
    'comparisonPopup': comparisonPopup(),
    'key_highlights': keyHighlights(),
    'campus_immersion': campusImmersion(),
    'digital_marketing_tools': digitalMarketingTools(),
    'next_gen_power_tools': nextGenPowerTools(),
    'industry_experts': industryExperts(),
    'career_oppotunities': careerOpportunities(),
    'cta_section': ctaSection(),
    'aluminis_work_at': aluminisWorkAt(),
    'learning_methedology': learningMethedology(),
    'suppersessions_section': supersessionsSection(),
    'fees_section': feesSection(),
    'testimonials': testimonials(),
    'faqs': faqsSection()
  }
  res.json(contentData);
});

app.post('/api/check-signin', (req, res) => {
  const signInBody = req.body;
  const signInURL = "https://betabackend.iide.co/auth/sign-in";
  const headers = {
    'Content-Type': 'application/json',
    'production': 'false',
  };
  let result = null;
  // Send the POST request
  axios.post(signInURL, signInBody, {headers})
    .then(response => {
      console.log('Response:', response.data);
      return res.status(200).json({ data: response.data });
    })
    .catch(error => {
      console.error('Error:', error);
      // Send an error response to the client
      return res.status(500).json({ message: error });
    });
});

app.post('/api/submit-partial-entry', (req, res) => {
  const formData = req.body;
  if(formData.entryData['first_name'] || formData.entryData['last_name']){
    const entryURL = "https://betabackend.iide.co/auth/partialEntry";
    const headers = {
      'Content-Type': 'application/json',
      'production': 'false',
    };
    let result = null;
    // Send the POST request
    axios.post(entryURL, formData.entryData, {headers})
      .then(response => {
        console.log('Response:', response.data);
        return res.status(200).json({ data: response.data });
      })
      .catch(error => {
        console.error('Error:', error);
        // Send an error response to the client
        return res.status(500).json({ message: error.message });
      });
  }
});

app.post('/api/check-signup', (req, res) => {
  const formData = req.body;
  const entryURL = "https://betabackend.iide.co/auth/sign-up";
  const headers = {
    'Content-Type': 'application/json',
    'production': 'false',
  };
  let result = null;
  // Send the POST request
  axios.post(entryURL, formData.entryData, {headers})
    .then(response => {
      console.log('Response:', response.data);
      return res.status(200).json({ data: response.data });
    })
    .catch(error => {
      console.error('Error:', error);
      // Send an error response to the client
      return res.status(500).json({ message: error.message });
    });
});

app.post('/api/verify-otp', (req, res) => {
  const formData = req.body;
  const entryURL = "https://betabackend.iide.co/auth/validate-otp";
  const headers = {
    'Content-Type': 'application/json',
    'production': 'false',
  };
  let result = null;
  // Send the POST request
  axios.post(entryURL, formData, {headers})
    .then(response => {
      console.log('Response:', response);
      return res.status(200).json({ data: response });
    })
    .catch(error => {
      console.error('Error:', error);
      // Send an error response to the client
      return res.status(500).json({ message: error.message });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
