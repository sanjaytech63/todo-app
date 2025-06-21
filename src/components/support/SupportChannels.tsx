import { FiMail, FiMessageSquare, FiHelpCircle, FiUsers, FiExternalLink } from 'react-icons/fi';
import { SupportChannel } from '@/imports';

interface SupportChannelsProps {
  channels: SupportChannel[];
}

const SupportChannels = ({ channels }: SupportChannelsProps) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'FiMail':
        return <FiMail className="text-indigo-600 text-2xl" />;
      case 'FiMessageSquare':
        return <FiMessageSquare className="text-indigo-600 text-2xl" />;
      case 'FiHelpCircle':
        return <FiHelpCircle className="text-indigo-600 text-2xl" />;
      case 'FiUsers':
        return <FiUsers className="text-indigo-600 text-2xl" />;
      default:
        return <FiHelpCircle className="text-indigo-600 text-2xl" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {channels.map((channel) => (
        <div
          key={channel.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              {getIconComponent(channel.icon)}
              <h3 className="ml-3 text-lg font-medium text-gray-900">{channel.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{channel.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>Response time: {channel.responseTime}</span>
            </div>
            <a
              href={
                channel.title === 'Email Support'
                  ? `mailto:${channel.contact}`
                  : '#'
              }
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
            >
              {channel.contact}
              {channel.title !== 'Email Support' && (
                <FiExternalLink className="ml-1" />
              )}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SupportChannels;