import {useState} from 'react';

import EditTargetCard from './EditTargetCard';
import TargetViewCard from './TargetViewCard';

const TargetCard = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  return isEditMode ? <EditTargetCard /> : <TargetViewCard toggleEditMode={setIsEditMode} />;
};
export default TargetCard;
