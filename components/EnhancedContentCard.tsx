import React from 'react';
import { BookOpen, GraduationCap, Youtube, Eye, Heart, User } from 'lucide-react';
import { DemoContent } from '../data/demoContents';

interface EnhancedContentCardProps {
    content: DemoContent;
    onClick?: () => void;
}

export const EnhancedContentCard: React.FC<EnhancedContentCardProps> = ({
    content,
    onClick
}) => {
    const { title, description, organization, uploadedBy, views, likes } = content;
    const { subjectPath, universityPath, channelPath } = organization;

    return (
        <div
            onClick={onClick}
            className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all cursor-pointer group"
        >
            {/* Title */}
            <h3 className="font-black text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 font-medium mb-4 line-clamp-2">
                {description}
            </p>

            {/* Organization Paths */}
            <div className="space-y-2 mb-4">
                {/* Subject Path */}
                {subjectPath && (
                    <div className="flex items-start space-x-2">
                        <BookOpen className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
                        <div className="flex items-center space-x-1 text-xs font-medium text-blue-900 flex-wrap">
                            <span>{subjectPath.subject}</span>
                            <span className="text-blue-400">›</span>
                            <span>{subjectPath.coreTopic}</span>
                            <span className="text-blue-400">›</span>
                            <span>{subjectPath.subtopic}</span>
                        </div>
                    </div>
                )}

                {/* University Path */}
                {universityPath && (
                    <div className="flex items-start space-x-2">
                        <GraduationCap className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                        <div className="flex items-center space-x-1 text-xs font-medium text-purple-900 flex-wrap">
                            <span>{universityPath.university}</span>
                            <span className="text-purple-400">›</span>
                            <span>Sem {universityPath.semester}</span>
                            <span className="text-purple-400">›</span>
                            <span>{universityPath.department.split('(')[1]?.replace(')', '') || universityPath.department}</span>
                        </div>
                    </div>
                )}

                {/* Channel Path */}
                {channelPath && (
                    <div className="flex items-start space-x-2">
                        <Youtube className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                        <div className="flex items-center space-x-1 text-xs font-medium text-red-900 flex-wrap">
                            <span>{channelPath.channelName}</span>
                            <span className="text-red-400">›</span>
                            <span>{channelPath.playlistName}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <User size={14} />
                    <span className="font-medium">{uploadedBy}</span>
                </div>

                <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                        <Eye size={14} />
                        <span className="font-medium">{views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Heart size={14} />
                        <span className="font-medium">{likes}</span>
                    </div>
                </div>
            </div>

            {/* Transparency Notice */}
            <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center font-medium">
                    ℹ️ Community-contributed content
                </p>
            </div>
        </div>
    );
};
