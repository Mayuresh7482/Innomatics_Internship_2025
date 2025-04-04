// Utility functions to generate placeholder images for the app
// These are used when real images aren't available or during development

// Fixed placeholder images to use throughout the app
export const placeholders = {
  // Food donation placeholder
  foodDonation: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  
  // User/profile placeholder
  profile: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  
  // NGO placeholder
  ngo: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  
  // Volunteer placeholder
  volunteer: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  
  // Restaurant/donor placeholder
  restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  
  // Default fallback image
  default: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  
  // Additional placeholders that may be missing
  heroBackground: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
  heroIllustration: 'https://images.unsplash.com/photo-1593113616828-9f91c72288ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  ctaBackground: 'https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
  testimonial1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  testimonial2: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  testimonial3: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  puneMap: 'https://images.unsplash.com/photo-1587385789097-0197a7fbd179?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  aboutHero: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
  puneCity: 'https://images.unsplash.com/photo-1625730029744-abba116da76c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  ourStory: 'https://images.unsplash.com/photo-1535890696255-dd5bcd79e6df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  teamMember1: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  teamMember2: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  teamMember3: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  teamMember4: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  logo: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  ngoLogo: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
};

/**
 * Generate a random placeholder image from Unsplash
 * @param {string} category - The category of the image (food, people, etc.)
 * @param {number} width - Width of the image in pixels
 * @param {number} height - Height of the image in pixels
 * @returns {string} URL of the placeholder image
 */
export const getRandomPlaceholder = (category = 'food', width = 500, height = 500) => {
  return `https://source.unsplash.com/random/${width}x${height}/?${category}`;
};

/**
 * Generate a placeholder image with a specific seed
 * @param {string} seed - Seed text to generate a specific image
 * @param {number} width - Width of the image in pixels
 * @param {number} height - Height of the image in pixels
 * @returns {string} URL of the placeholder image
 */
export const getSeedPlaceholder = (seed, width = 500, height = 500) => {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}; 