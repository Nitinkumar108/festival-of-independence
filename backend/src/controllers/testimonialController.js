const { Testimonial } = require("../models");

const DEFAULT_TESTIMONIALS = [
  {
    name: "Aritra Hazra",
    designation: "HR, TATA Electronics",
    company: "MBA, IISWBM",
    image: "/testimonials/AritraHazra.jpg",
    headline: "LIFE TRANSFORMED FOR THE BETTER!",
    quote: "After taking this course, my life has transformed for the better. It gave a clarity of thought and a purpose. It showed me the way to stay undisturbed in potentially disturbing situations. The takeaways have helped me in my student as well professional life.",
    rating: 5,
    order: 1,
  },
  {
    name: "Shibam Choudhury",
    designation: "MBBS 2nd Year Student",
    company: "IPGMER & SSKM Hospital",
    image: "/testimonials/Shibam.jpg",
    headline: "DISCIPLINE & EMOTIONAL RESILIENCE!",
    quote: "Alongside my MBBS studies, this journey has helped me develop discipline, focus, and emotional resilience. Far from being a distraction, it has improved my academic performance while giving me greater clarity, confidence, and purpose.",
    rating: 5,
    order: 2,
  },
  {
    name: "Sayan Guha",
    designation: "CEO",
    company: "RG Medtech Pvt. Ltd.",
    image: "/testimonials/Sayan.jpg",
    headline: "LESSONS OF HUMILITY & SELFLESS SERVICE!",
    quote: "The lessons taught me discipline, humility and Selfless service. It inspired me to appreciate the importance of creating an ecosystem with the same shared values for everyone to work together with mutual respect and a common purpose to create a lasting change.",
    rating: 5,
    order: 3,
  },
  {
    name: "Aditya Anand Singh",
    designation: "Professional Cricketer",
    company: "CAB Super Division",
    image: "/testimonials/Aditya.jpg",
    headline: "RISE ABOVE DAILY PRESSURES!",
    quote: "It helped me rise above daily pressures and focus on what truly matters. They strengthened my mind and awakened a deeper appreciation for the Divine, revealing a connection I had never recognized before.",
    rating: 5,
    order: 4,
  },
  {
    name: "Subhojit Dhar",
    designation: "Manager, TATA Steel",
    company: "Gold Medalist, IIEST Shibpur",
    image: "/testimonials/subojit-pr.jpeg",
    headline: "GREATER CLARITY & DIRECTION IN LIFE!",
    quote: "This journey helped me gain greater clarity and direction in life. The practices and guidance encouraged me to stay grounded and gradually become less influenced by distractions, helping me focus more on what truly matters.",
    rating: 5,
    order: 5,
  },
  {
    name: "Arup Rai",
    designation: "PADA Engr., Accenture",
    company: "B.Tech, B.P. Poddar University",
    image: "/testimonials/arup_rai.jpeg",
    headline: "CLEAR PURPOSE AND VISION!",
    quote: "The teachings of Vedic Scriptures gave me clear purpose and vision. Embracing selflessness, compassion, and equal vision helps me build inclusive, growth-oriented spaces, stay dedicated to excellence, and view failures as valuable lessons.",
    rating: 5,
    order: 6,
  },
  {
    name: "Adarsh Singh",
    designation: "Software Engineer, CIMPRESS",
    company: "B.Tech, IIEST Shibpur",
    image: "/testimonials/Adarsh.jpg",
    headline: "BALANCED LIFE & POSITIVE MINDSET!",
    quote: "These sessions have helped me balance my academic, professional, and personal life while managing stress with a calm and positive mindset.",
    rating: 5,
    order: 7,
  },
  {
    name: "Nitin Kr. Bais",
    designation: "IT System Analyst, Bandhan Bank",
    company: "B.Tech, IIEST Shibpur",
    image: "/testimonials/Nitin.jpg",
    headline: "INNER PEACE IN A FAST-PACED WORLD!",
    quote: "Spirituality has given me a balanced and focused life with a clear sense of purpose. It has helped me stay away from negativity, remain calm during challenges, and experience inner peace. I believe it is especially valuable for students in today's fast-paced world.",
    rating: 5,
    order: 8,
  },
  {
    name: "Swamynath Chourasia",
    designation: "Accountant",
    company: "B.Com., Jaipuria College",
    image: "/testimonials/Swamynath.jpg",
    headline: "STRENGTHENED WISDOM & CHARACTER!",
    quote: "These sessions have helped me clearly see my goal in life and strive towards it with purpose and determination. They have strengthened my wisdom and character enabling me to make better decisions, stay focused during challenges, and become a more responsible and noble individual.",
    rating: 5,
    order: 9,
  },
  {
    name: "Aritra Roy",
    designation: "Asst. Manager, HINDALCO",
    company: "Gold Medalist, IIEST Shibpur",
    image: "/testimonials/Aritra.jpg",
    headline: "SPACE TO DEEPLY INTROSPECT!",
    quote: "This course gave me the space to deeply introspect about life and taught me what it truly means to be a kind and responsible gentleman. It is where I learned to take responsibility and developed the soft skills that you often don't find within the four walls of a classroom.",
    rating: 5,
    order: 10,
  },
  {
    name: "Sushovan Maity",
    designation: "Territory Manager",
    company: "SKF",
    image: "/testimonials/Sushovan.png",
    headline: "CATALYST FOR TRANSFORMATION!",
    quote: "This is far beyond a standard course; it’s a catalyst for transformation. It helped me align my daily habits with my core values, enabling me to make conscious decisions and lead with absolute integrity in every facet of my life. For anyone serious about unlocking their full potential, leading with honor, and creating a future of true impact, this program will deliver far beyond their expectations!",
    rating: 5,
    order: 11,
  },
  {
    name: "Biswarup Dutta",
    designation: "Law Student | Guitarist",
    company: "Heritage Law College",
    image: "/testimonials/Biswarup.png",
    headline: "PERSPECTIVE TRANSFORMED TOWARDS LIFE!",
    quote: "My journey has transformed my perspective towards life, giving me purpose, discipline, humility, compassion, gratitude, and a spirit of selfless service. It has strengthened my ability to remain patient, focused, and dedicated during challenges. I have learned to value meaningful relationships, develop a positive attitude, and use my abilities for the welfare of others. This journey has inspired me to contribute towards creating a more compassionate, inclusive, and value-driven society.",
    rating: 5,
    order: 12,
  },
];

function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

/** GET /api/testimonials — public, fetches testimonials for Home page carousel & admin */
async function listTestimonials(req, res, next) {
  try {
    let items = await Testimonial.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (items.length === 0) {
      await Testimonial.bulkCreate(DEFAULT_TESTIMONIALS);
      items = await Testimonial.findAll({
        order: [["createdAt", "DESC"]],
      });
    }

    res.json(items);
  } catch (err) {
    next(err);
  }
}

/** POST /api/testimonials — Admin / Super Admin only */
async function createTestimonial(req, res, next) {
  try {
    const { name, designation, company, headline, image, quote, rating, isApproved } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required." });
    }
    if (!designation || !designation.trim()) {
      return res.status(400).json({ message: "Designation is required." });
    }
    if (!quote || !quote.trim()) {
      return res.status(400).json({ message: "Testimonial text is required." });
    }

    const words = countWords(quote);
    if (words > 50) {
      return res.status(400).json({
        message: `Testimonial quote cannot exceed 50 words. You currently have ${words} words.`,
      });
    }

    const item = await Testimonial.create({
      name: name.trim(),
      designation: designation.trim(),
      company: company ? company.trim() : null,
      headline: headline ? headline.trim() : `TRANSFORMATIVE EXPERIENCE!`,
      image: image || "/testimonials/AritraHazra.jpg",
      quote: quote.trim(),
      rating: rating ? parseInt(rating) : 5,
      isApproved: isApproved !== undefined ? Boolean(isApproved) : true,
    });

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

/** PUT /api/testimonials/:id — Admin / Super Admin only */
async function updateTestimonial(req, res, next) {
  try {
    const item = await Testimonial.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Testimonial not found." });
    }

    const { name, designation, company, headline, image, quote, rating, isApproved } = req.body;

    if (quote) {
      const words = countWords(quote);
      if (words > 50) {
        return res.status(400).json({
          message: `Testimonial quote cannot exceed 50 words. You currently have ${words} words.`,
        });
      }
    }

    await item.update({
      name: name ? name.trim() : item.name,
      designation: designation ? designation.trim() : item.designation,
      company: company !== undefined ? (company ? company.trim() : null) : item.company,
      headline: headline !== undefined ? (headline ? headline.trim() : null) : item.headline,
      image: image !== undefined ? image : item.image,
      quote: quote ? quote.trim() : item.quote,
      rating: rating !== undefined ? parseInt(rating) : item.rating,
      isApproved: isApproved !== undefined ? Boolean(isApproved) : item.isApproved,
    });

    res.json(item);
  } catch (err) {
    next(err);
  }
}

/** DELETE /api/testimonials/:id — Admin / Super Admin only */
async function deleteTestimonial(req, res, next) {
  try {
    const item = await Testimonial.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Testimonial not found." });
    }

    await item.destroy();
    res.json({ message: "Testimonial deleted successfully." });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  DEFAULT_TESTIMONIALS,
};
