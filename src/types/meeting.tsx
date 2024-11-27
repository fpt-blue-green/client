interface IMeeting {
  id: string;
  roomName: string;
  startAt: string;
  endAt: string;
  participant: string[];
  description?: string;
  isFirstTime: boolean;
  createdAt: string;
}

export default IMeeting;
