import { createResource } from 'react-resource-router';
import { jiraClient } from '../../services';

export const profileResource = createResource({
  type: 'PROFILE',
  getKey: () => 'profile',
  getData: async () => {
    return await jiraClient.myself.getCurrentUser();
  }
});
