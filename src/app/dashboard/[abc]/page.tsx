'use client';

import Comp1 from '@/components/comp1';
import { AuthContext, useCount } from '@/contexts/AuthContext';
import { useContext } from 'react';

const DashboardPage = () => {
  const { userState, updateUserState } = useCount();

  return (
    <div>
      {userState.count}
      <button
        onClick={() => {
          updateUserState({ type: 'INCREMENT' });
        }}
      >
        Hi Click Me again
      </button>
      <Comp1 />
    </div>
  );
};

export default DashboardPage;
