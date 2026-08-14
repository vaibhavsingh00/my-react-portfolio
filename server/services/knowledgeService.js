const fs = require('fs');
const path = require('path');

const KNOWLEDGE_DIR = path.join(__dirname, '..', 'knowledge');

/**
 * Safely reads and parses a JSON file from the knowledge directory.
 * @param {string} fileName 
 * @param {*} defaultValue 
 * @returns {*} Parsed JSON content or defaultValue
 */
function readJsonFile(fileName, defaultValue = null) {
  try {
    const filePath = path.join(KNOWLEDGE_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      return defaultValue;
    }
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`[KnowledgeService] Error loading ${fileName}:`, error.message);
    return defaultValue;
  }
}

/**
 * Loads all knowledge files into a single structured object.
 * @returns {Object} Complete verified knowledge base
 */
function loadAllKnowledge() {
  const personal = readJsonFile('personal.json', {});
  const education = readJsonFile('education.json', {});
  const skills = readJsonFile('skills.json', {});
  const projects = readJsonFile('projects.json', []);
  const experience = readJsonFile('experience.json', {});
  const certifications = readJsonFile('certifications.json', {});
  const achievements = readJsonFile('achievements.json', {});
  const contact = readJsonFile('contact.json', {});

  return {
    personal,
    education,
    skills,
    projects,
    experience,
    certifications,
    achievements,
    contact
  };
}

/**
 * Converts the structured knowledge into a clean text context for the AI prompt.
 * @returns {string} Formatted verified knowledge
 */
function getFormattedKnowledgeContext() {
  const data = loadAllKnowledge();

  let context = '=== VERIFIED KNOWLEDGE BASE FOR VAIBHAV SINGH ===\n\n';

  // Personal Information
  if (data.personal && data.personal.name) {
    context += `[PERSONAL PROFILE & LOCATION]\n`;
    context += `Full Name: ${data.personal.name}\n`;
    context += `Preferred Name: ${data.personal.preferredName || 'Vaibhav'}\n`;
    context += `Professional Roles / Title: ${data.personal.title || ''}\n`;
    context += `Current Residence: Vaibhav currently lives in Kanpur, India.\n`;
    context += `Bio: ${data.personal.bio || ''}\n`;
    if (data.personal.interests && data.personal.interests.length > 0) {
      context += `Interests: ${data.personal.interests.join(', ')}\n`;
    }
    context += '\n';
  }

  // Education
  if (data.education && Array.isArray(data.education.education) && data.education.education.length > 0) {
    context += `[VERIFIED EDUCATION]\n`;
    data.education.education.forEach((edu, idx) => {
      context += `${idx + 1}. Institution: ${edu.institution}\n`;
      context += `   Degree / Program: ${edu.degree}\n`;
      if (edu.field) context += `   Field / Specialization: ${edu.field}\n`;
      if (edu.board) context += `   Board: ${edu.board}\n`;
      if (edu.class) context += `   Class / Level: ${edu.class}\n`;
      if (edu.percentage) context += `   Percentage: ${edu.percentage}\n`;
      if (edu.period) context += `   Period: ${edu.period}\n`;
      if (edu.year) context += `   Year: ${edu.year}\n`;
      if (edu.location) context += `   Location: ${edu.location}\n`;
    });
    context += '\n';
  }

  // Skills
  if (data.skills) {
    context += `[TECHNICAL & CREATIVE SKILLS]\n`;
    if (data.skills.webDevelopment?.length) {
      context += `- Web Development: ${data.skills.webDevelopment.join(', ')}\n`;
    }
    if (data.skills.programming?.length) {
      context += `- Programming Languages: ${data.skills.programming.join(', ')}\n`;
    }
    if (data.skills.aiMl?.length) {
      context += `- AI & Machine Learning / Computer Vision: ${data.skills.aiMl.join(', ')}\n`;
    }
    if (data.skills.design?.length) {
      context += `- Graphic Design & Media Editing: ${data.skills.design.join(', ')}\n`;
    }
    if (data.skills.other?.length) {
      context += `- Embedded Systems, Robotics & Tools: ${data.skills.other.join(', ')}\n`;
    }
    context += '\n';
  }

  // Projects
  if (Array.isArray(data.projects) && data.projects.length > 0) {
    context += `[PORTFOLIO PROJECTS]\n`;
    data.projects.forEach((proj, idx) => {
      context += `${idx + 1}. ${proj.name} (${proj.category})\n`;
      context += `   Summary: ${proj.summary}\n`;
      if (proj.technologies?.length) {
        context += `   Technologies: ${proj.technologies.join(', ')}\n`;
      }
      if (proj.features?.length) {
        context += `   Key Features: ${proj.features.join('; ')}\n`;
      }
      if (proj.role) {
        context += `   Role: ${proj.role}\n`;
      }
    });
    context += '\n';
  }

  // Experience
  if (data.experience?.workExperience?.length) {
    context += `[WORK EXPERIENCE / BACKGROUND]\n`;
    data.experience.workExperience.forEach((exp) => {
      context += `- Role: ${exp.role}\n`;
      context += `  Summary: ${exp.summary}\n`;
      if (exp.focus?.length) {
        context += `  Focus Areas: ${exp.focus.join(', ')}\n`;
      }
    });
    if (data.experience.note) {
      context += `  Status: ${data.experience.note}\n`;
    }
    context += '\n';
  }

  // Achievements
  if (data.achievements?.achievements?.length) {
    context += `[HIGHLIGHTED ACHIEVEMENTS]\n`;
    data.achievements.achievements.forEach((ach) => {
      context += `- ${ach}\n`;
    });
    context += '\n';
  }

  // Certifications
  if (data.certifications && data.certifications.certifications?.length > 0) {
    context += `[CERTIFICATIONS]\n`;
    data.certifications.certifications.forEach(cert => {
      context += `- ${cert.name || cert}\n`;
    });
    context += '\n';
  }

  // Contact & Socials
  if (data.contact) {
    context += `[CONTACT & SOCIAL PROFILES]\n`;
    if (data.contact.email) context += `Email: ${data.contact.email}\n`;
    if (data.contact.location) context += `Location: ${data.contact.location}\n`;
    if (data.contact.socialProfiles) {
      if (data.contact.socialProfiles.linkedin) context += `LinkedIn: ${data.contact.socialProfiles.linkedin}\n`;
      if (data.contact.socialProfiles.github) context += `GitHub: ${data.contact.socialProfiles.github}\n`;
      if (data.contact.socialProfiles.instagram) context += `Instagram: ${data.contact.socialProfiles.instagram}\n`;
    }
    if (data.contact.freelanceInquiries) context += `Freelance / Hiring: ${data.contact.freelanceInquiries}\n`;
    context += '\n';
  }

  context += '=== END VERIFIED KNOWLEDGE BASE ===';
  return context;
}

/**
 * RAG-ready interface: Retrieves relevant knowledge for a given user query.
 * In Version 1, this returns the full verified knowledge context.
 * In Version 2, this can be swapped with semantic search / vector retrieval.
 * @param {string} query 
 * @returns {Promise<string>} Knowledge context
 */
async function retrieveRelevantKnowledge(query) {
  // Version 1: Structured modular loader
  return getFormattedKnowledgeContext();
}

module.exports = {
  loadAllKnowledge,
  getFormattedKnowledgeContext,
  retrieveRelevantKnowledge
};
