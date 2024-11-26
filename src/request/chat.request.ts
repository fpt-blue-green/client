import http from '@/lib/http';

const chatRequest = {
  addMembers: (id: string, userIds: string[]) => http.post(`/Contact/chat/contacts/${id}/addMembers`, userIds),
  deleteMember: (id: string, userId: string) =>
    http.delete(`/Contact/chat/contacts/${id}/deleteMember?userId=${userId}`),
};

export default chatRequest;
