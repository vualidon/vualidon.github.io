-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL, -- Markdown content
  excerpt TEXT NOT NULL,
  author TEXT NOT NULL,
  date TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT true,
  bg_color TEXT NOT NULL DEFAULT 'from-neon-blue/20 to-neon-purple/20',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to read published posts
CREATE POLICY "Allow public read access to published posts" ON blog_posts
  FOR SELECT
  USING (published = true);

-- Allow authenticated users to manage all posts
CREATE POLICY "Allow authenticated users to manage all posts" ON blog_posts
  FOR ALL
  TO authenticated
  USING (true);

-- Insert sample blog posts (in Markdown format)
INSERT INTO blog_posts (title, slug, content, excerpt, author, date, published, bg_color)
VALUES
  (
    'Getting Started with AI Development',
    'getting-started-with-ai-development',
    '# Getting Started with AI Development

Artificial Intelligence (AI) has become one of the most transformative technologies of our time. From virtual assistants to autonomous vehicles, AI is reshaping industries and changing the way we interact with technology.

## What is AI Development?

AI development involves creating systems that can perform tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding.

## Essential Tools for AI Development

To get started with AI development, you''ll need to familiarize yourself with several key tools and frameworks:

* **Python**: The most popular programming language for AI development due to its simplicity and extensive libraries.
* **TensorFlow**: An open-source machine learning framework developed by Google.
* **PyTorch**: A deep learning framework that''s gaining popularity for its dynamic computation graph.
* **Scikit-learn**: A simple and efficient tool for data mining and data analysis.
* **Jupyter Notebooks**: An interactive computing environment that facilitates the creation and sharing of documents containing live code, equations, visualizations, and narrative text.

## Getting Started with Machine Learning

Machine Learning (ML) is a subset of AI that focuses on building systems that can learn from data. Here''s a simple roadmap to get started:

1. Learn the fundamentals of programming with Python.
2. Understand the basics of statistics and linear algebra.
3. Study machine learning algorithms and their applications.
4. Practice with real-world datasets.
5. Build your own projects to apply what you''ve learned.

## The Future of AI Development

The field of AI is evolving rapidly, with new breakthroughs happening regularly. As you embark on your AI development journey, keep an eye on emerging trends such as:

* Reinforcement Learning
* Generative AI
* Explainable AI
* AI Ethics and Responsible AI

By staying current with these developments, you''ll be well-positioned to contribute to this exciting field.',
    'An introduction to the world of artificial intelligence development and the tools you need to get started.',
    'Le Vo Quyet Thang',
    'May 15, 2023',
    true,
    'from-neon-blue/20 to-neon-purple/20'
  ),
  (
    'The Future of Computer Vision',
    'future-of-computer-vision',
    '# The Future of Computer Vision

Computer Vision is rapidly evolving, with new applications and technologies emerging every day. This post explores the cutting-edge developments in the field and what we can expect in the coming years.

## Current State of Computer Vision

Computer Vision has made remarkable progress in recent years, driven by advances in deep learning and neural networks. Today''s systems can recognize objects, faces, and scenes with impressive accuracy.

## Emerging Trends

Several exciting trends are shaping the future of Computer Vision:

* **3D Vision**: Moving beyond 2D image analysis to understand the three-dimensional structure of scenes.
* **Video Understanding**: Analyzing not just static images but the temporal dynamics of video sequences.
* **Multi-modal Learning**: Combining vision with other modalities like text and audio for richer understanding.
* **Edge Computing**: Running computer vision algorithms on edge devices rather than in the cloud.

## Applications on the Horizon

These advances are enabling new applications across various domains:

1. Autonomous vehicles with enhanced perception capabilities
2. Medical imaging systems that can detect diseases earlier and more accurately
3. Augmented reality experiences that seamlessly blend the digital and physical worlds
4. Smart cities with intelligent surveillance and traffic management

## Challenges and Opportunities

Despite the progress, several challenges remain:

* Ensuring privacy and ethical use of computer vision technology
* Reducing the computational requirements of advanced models
* Improving robustness to adversarial attacks and domain shifts
* Making computer vision systems more interpretable and explainable

These challenges present opportunities for researchers and practitioners to make significant contributions to the field.',
    'Exploring the latest advancements in computer vision technology and what the future holds for this exciting field.',
    'Le Vo Quyet Thang',
    'June 22, 2023',
    true,
    'from-neon-purple/20 to-neon-pink/20'
  ),
  (
    'Machine Learning Best Practices',
    'machine-learning-best-practices',
    '# Machine Learning Best Practices

Implementing machine learning models in production environments requires careful planning and adherence to best practices. This post outlines key considerations for successful ML deployments.

## Data Quality and Preparation

The foundation of any successful machine learning project is high-quality data:

* **Data Cleaning**: Remove duplicates, handle missing values, and correct errors.
* **Feature Engineering**: Create meaningful features that capture the underlying patterns in your data.
* **Data Splitting**: Properly divide your data into training, validation, and test sets.
* **Data Versioning**: Track changes to your datasets over time.

## Model Development

When developing your models, consider these practices:

1. Start with simple models before moving to more complex ones.
2. Use cross-validation to ensure your model generalizes well.
3. Regularly evaluate your model against baseline approaches.
4. Document your modeling decisions and experiments.

## Deployment and Monitoring

Once your model is ready for production:

* **Containerization**: Use Docker to package your model and its dependencies.
* **CI/CD Pipelines**: Automate testing and deployment processes.
* **Monitoring**: Track model performance, data drift, and system health.
* **Feedback Loops**: Establish mechanisms to incorporate user feedback and new data.

## Ethical Considerations

Finally, ensure your ML systems are developed and deployed responsibly:

* Assess potential biases in your data and models.
* Consider the privacy implications of your ML system.
* Design for transparency and explainability.
* Regularly audit your system for unintended consequences.

By following these best practices, you can build machine learning systems that are not only technically sound but also reliable, maintainable, and ethical.',
    'Learn the best practices for implementing machine learning models in production environments.',
    'Le Vo Quyet Thang',
    'July 10, 2023',
    true,
    'from-cyber-yellow/20 to-neon-blue/20'
  )
ON CONFLICT (slug) DO NOTHING; 