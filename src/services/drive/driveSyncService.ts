
import { DriveItem, DriveSource, Subject, Topic, Subtopic } from '@/types';

const DRIVE_STORAGE_KEY = 'openlearn_drive_items';

export const driveSyncService = {
  getDriveItems(): DriveItem[] {
    const stored = localStorage.getItem(DRIVE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  syncContribution(data: {
    subject: Subject;
    topic: Topic | { title: string, id: string };
    subtopic: Subtopic | { title: string, id: string };
    title: string;
    quiz?: any;
  }) {
    const items = this.getDriveItems();
    const fileName = `${data.subject.name}_${data.topic.title}_${data.subtopic.title}_${data.title}`.replace(/\s+/g, '_');

    const newItem: DriveItem = {
      id: `up_${Date.now()}`,
      name: `${fileName}.pdf`,
      subjectId: data.subject.id,
      topicId: data.topic.id,
      subtopicId: data.subtopic.id,
      subjectName: data.subject.name,
      topicName: data.topic.title,
      subtopicName: data.subtopic.title,
      title: data.title,
      source: DriveSource.Uploaded,
      timestamp: new Date().toLocaleString(),
      mimeType: 'application/pdf',
      size: '1.2 MB'
    };

    localStorage.setItem(DRIVE_STORAGE_KEY, JSON.stringify([newItem, ...items]));
    window.dispatchEvent(new Event('drive-sync'));
  },

  syncDownload(data: {
    subject: Subject;
    topic: Topic;
    subtopic: Subtopic;
    title: string;
  }) {
    const items = this.getDriveItems();

    // Check if already downloaded to prevent duplicates
    const exists = items.find(i =>
      i.source === DriveSource.Downloaded &&
      i.title === data.title &&
      i.subtopicId === data.subtopic.id
    );
    if (exists) return;

    const fileName = `${data.subject.name}_${data.topic.title}_${data.subtopic.title}_${data.title}`.replace(/\s+/g, '_');

    const newItem: DriveItem = {
      id: `dl_${Date.now()}`,
      name: `${fileName}.pdf`,
      subjectId: data.subject.id,
      topicId: data.topic.id,
      subtopicId: data.subtopic.id,
      subjectName: data.subject.name,
      topicName: data.topic.title,
      subtopicName: data.subtopic.title,
      title: data.title,
      source: DriveSource.Downloaded,
      timestamp: new Date().toLocaleString(),
      mimeType: 'application/pdf',
      size: '850 KB'
    };

    localStorage.setItem(DRIVE_STORAGE_KEY, JSON.stringify([newItem, ...items]));
    window.dispatchEvent(new Event('drive-sync'));
  }
};
