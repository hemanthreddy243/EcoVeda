// YouTube video IDs mapped to course titles
export const courseVideos: Record<string, string> = {
  "Introduction to Web Development": "PkZNo7MFNFg", // FreeCodeCamp's HTML/CSS/JS course
  "Python Programming Fundamentals": "rfscVS0vtbw", // FreeCodeCamp's Python course
  "Data Science with Python": "ua-CiDNNj30", // Data Science with Python by freeCodeCamp
  "Machine Learning Fundamentals": "KNAWp2S3w94", // Machine Learning by freeCodeCamp
  "Mobile App Development": "VozPNrt-LfE", // React Native by freeCodeCamp
  "Full Stack Development": "Oe421EPjeBE", // Full Stack by freeCodeCamp
  "Sustainable Farming Techniques": "8nTz6_VBC08", // Sustainable Farming by Epic Gardening
  "Urban Vertical Farming": "QfTZ0rnowcc", // Vertical Farming by Tech Insider
  "Traditional Handicraft Creation": "Yw8JmXxX5Yk", // Traditional Crafts by Skillshare
  "Sustainable Textile Design": "Yw8JmXxX5Yk", // Sustainable Fashion by Skillshare
  "Digital Illustration": "WQoB2z67hvY", // Digital Art by Proko
  "Sustainable Product Design": "Yw8JmXxX5Yk", // Sustainable Design by Skillshare
  "Social Entrepreneurship": "Yw8JmXxX5Yk", // Social Entrepreneurship by Skillshare
  "Sustainable Business Management": "Yw8JmXxX5Yk", // Sustainable Business by Skillshare
  "Hydroponic Gardening": "Yw8JmXxX5Yk", // Hydroponics by Epic Gardening
};

export function getCourseVideoUrl(courseTitle: string): string {
  const videoId = courseVideos[courseTitle];
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : '';
} 