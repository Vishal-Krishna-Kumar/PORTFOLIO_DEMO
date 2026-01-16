import React from 'react';
import './FloatingControls.css';
import { Hand, User, Snowflake } from 'lucide-react';

interface FloatingControlsProps {
  onHandClick: () => void;
  onHeadClick: () => void;
  isHandActive: boolean;
  isHeadActive: boolean;
  isSnowing: boolean;
  onSnowClick: () => void;
}

const FloatingControls: React.FC<FloatingControlsProps> = ({
  onHandClick,
  onHeadClick,
  isHandActive,
  isHeadActive,
  isSnowing,
  onSnowClick,
}) => {
  return (
    <div className="floating-controls">
      {/* Hand Mouse Button */}
      <button
        className={`floating-btn black-btn${isHandActive ? ' active' : ''}`}
        onClick={onHandClick}
        title="Hand Mouse"
      >
        <Hand className="w-4 h-4" />
        <span className="floating-label">Hand Mouse</span>
      </button>
      
      {/* Head Motion Button */}
      <button
        className={`floating-btn black-btn${isHeadActive ? ' active' : ''}`}
        onClick={onHeadClick}
        title="Head Motion"
      >
        <User className="w-4 h-4" />
        <span className="floating-label">Head Motion</span>
      </button>
      
      {/* Let it Snow Button */}
      <button
        className={`floating-btn black-btn${isSnowing ? ' active' : ''}`}
        onClick={onSnowClick}
        title={isSnowing ? 'Stop Snow' : 'Let it Snow'}
      >
        <Snowflake className="w-4 h-4" />
        <span className="floating-label">{isSnowing ? 'Stop Snow' : 'Let it Snow'}</span>
      </button>
    </div>
  );
};

export default FloatingControls;