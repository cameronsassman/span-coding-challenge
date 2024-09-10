import { useEffect, useState } from 'react';
import { fetchTopics } from '../utils/api';
import "./TopicsMenu.css";

interface TopicsMenuProps {
  onSelectTopic: (topic: string) => void;
}

const TopicsMenu: React.FC<TopicsMenuProps> = ({ onSelectTopic }) => {
  const [topics, setTopics] = useState<Array<{ slug: string; title: string }>>([]);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const topicsData = await fetchTopics();
        setTopics(topicsData);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    loadTopics();
  }, []);

  return (
    <div className="topics-menu">
      {topics.map((topic) => (
        <li key={topic.slug}>
          <button onClick={() => onSelectTopic(topic.slug)}>{topic.title}</button>
        </li>
      ))}
    </div>
  );
};

export default TopicsMenu;
