import { Calendar, Clock, ArrowRight } from 'lucide-react';

const articles = [
  {
    title: "10 Tips for Better Heart Health",
    description: "Learn simple lifestyle changes that can significantly improve your cardiovascular health and reduce risk factors.",
    date: "March 15, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Understanding Mental Health in the Digital Age",
    description: "Explore how technology affects our mental wellbeing and discover strategies for maintaining balance.",
    date: "March 12, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Nutrition Basics: Building Healthy Eating Habits",
    description: "A comprehensive guide to understanding nutrition labels, portion control, and meal planning.",
    date: "March 10, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600"
  }
];

const HealthArticles = () => {
  return (
    <section id="articles" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
            Latest Health Articles
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed with expert insights, health tips, and the latest medical news from our team of healthcare professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <a
              href="#" // Replace with actual article link
              key={index}
              className="group block overflow-hidden rounded-2xl shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Article Image with Hover Effect */}
              <div className="overflow-hidden h-48">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="bg-white p-6">
                {/* Meta Information */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-medical-primary" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-medical-primary" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Article Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight group-hover:text-medical-primary transition-colors duration-300">
                  {article.title}
                </h3>

                {/* Article Description */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.description}
                </p>

                {/* Read More Link/Button */}
                <div className="flex items-center font-semibold text-medical-primary group-hover:text-medical-primary/80 transition-colors duration-300">
                  Read More
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <button
            className="rounded-full bg-white border border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white px-8 py-3 text-lg font-semibold shadow-md transition-all"
          >
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default HealthArticles;