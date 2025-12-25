import React from 'react';
import { BookOpen, GraduationCap, Youtube, Eye, ThumbsUp, MessageSquare, Star, Download, ShieldCheck, Tag } from 'lucide-react';
import { DemoContent } from '@/data/demoContents';
import { FollowButton } from '@/components/ui/FollowButton';
import { subscriptionService } from '@/services/user/subscriptionService';

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

    // Mock interaction stats (in production, these would come from the content object)
    const upvotes = likes || 0;
    const comments = Math.floor(Math.random() * 20) + 1;
    const averageRating = 4.2 + Math.random() * 0.8; // Random rating between 4.2-5.0

    // Get creator info
    const creator = subscriptionService.getCreatorByUploaderName(uploadedBy);
    const eligibility = creator ? subscriptionService.getFollowEligibility({
        id: creator.id,
        name: creator.name,
        email: '',
        role: creator.role,
        verificationStatus: creator.verificationStatus,
        verificationLevel: creator.verificationLevel,
        communityMetrics: creator.communityMetrics,
        joinedDate: '',
        reputation: creator.reputation,
        badges: []
    }) : { canBeFollowed: false, badge: 'none' as const };

    return (
        <div
            onClick={onClick}
            className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all cursor-pointer group"
        >
            {/* Title */}
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-black text-gray-900 text-lg group-hover:text-blue-600 transition-colors flex-1 pr-2 line-clamp-1">
                    {title}
                </h3>
                <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full text-[10px] font-bold text-green-700 border border-green-200 shrink-0">
                    <ShieldCheck size={10} />
                    {(organization.universityPath || organization.coursePath) ? (
                        <span>Course</span>
                    ) : (
                        <span>Free</span>
                    )}
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 font-medium mb-4 line-clamp-2">
                {description}
            </p>

            {/* Organization Paths - Show max 2, simplified */}
            <div className="space-y-2 mb-4">
                {/* Priority 1: University Path (most specific for course content) */}
                {universityPath && (
                    <div className="flex items-start space-x-2">
                        <GraduationCap className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                        <div className="flex items-center space-x-1 text-xs font-medium text-purple-900 flex-wrap min-w-0">
                            <span className="truncate max-w-[200px]">{universityPath.university}</span>
                            <span className="text-purple-400">›</span>
                            <span className="truncate max-w-[150px]">{universityPath.department.split('(')[1]?.replace(')', '') || universityPath.department}</span>
                        </div>
                    </div>
                )}

                {/* Priority 2: Subject Path (if no university path) */}
                {!universityPath && subjectPath && (
                    <div className="flex items-start space-x-2">
                        <BookOpen className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
                        <div className="flex items-center space-x-1 text-xs font-medium text-blue-900 flex-wrap min-w-0">
                            <span className="truncate max-w-[150px]">{subjectPath.subject}</span>
                            <span className="text-blue-400">›</span>
                            <span className="truncate max-w-[150px]">{subjectPath.coreTopic}</span>
                        </div>
                    </div>
                )}

                {/* Priority 3: Channel Path (secondary info) - only if we have space */}
                {channelPath && !organization.competitiveExamPath && (
                    <div className="flex items-start space-x-2">
                        <Youtube className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                        <div className="flex items-center space-x-1 text-xs font-medium text-red-900 flex-wrap min-w-0">
                            <span className="truncate max-w-[200px]">{channelPath.channelName}</span>
                        </div>
                    </div>
                )}

                {/* Priority 4: Competitive Exam (replaces channel if present) */}
                {organization.competitiveExamPath && (
                    <div className="flex items-start space-x-2">
                        <div className="text-amber-600 flex-shrink-0 mt-0.5">🏆</div>
                        <div className="flex items-center space-x-1 text-xs font-medium text-amber-900 flex-wrap min-w-0">
                            <span className="truncate max-w-[120px]">{organization.competitiveExamPath.exam}</span>
                            <span className="text-amber-400">›</span>
                            <span className="truncate max-w-[100px]">{organization.competitiveExamPath.year}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-3 flex-wrap">
                <div className="flex items-center space-x-2 min-w-0">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 hover:text-blue-600 transition-colors cursor-pointer" onClick={(e) => { e.stopPropagation(); /* Navigate to profile */ }}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xs shrink-0">
                            {uploadedBy.charAt(0)}
                        </div>
                        <span className="font-medium underline decoration-dotted underline-offset-2 truncate max-w-[120px]">{uploadedBy}</span>
                    </div>

                    {/* Follow Button - show for all creators */}
                    {creator && (
                        <div onClick={(e) => e.stopPropagation()}>
                            <FollowButton
                                creatorId={creator.id}
                                creatorName={creator.name}
                                variant="compact"
                            />
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-3 text-xs text-gray-500 shrink-0">
                    <div className="flex items-center space-x-1 hover:text-blue-600 transition-colors cursor-pointer">
                        <Eye size={14} />
                        <span className="font-medium">{views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-blue-600 transition-colors cursor-pointer">
                        <ThumbsUp size={14} />
                        <span className="font-medium">{upvotes}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-blue-600 transition-colors cursor-pointer">
                        <MessageSquare size={14} />
                        <span className="font-medium">{comments}</span>
                    </div>
                    {content.downloads && (
                        <div className="flex items-center space-x-1 hover:text-green-600 transition-colors cursor-pointer">
                            <Download size={14} className="text-green-600" />
                            <span className="font-medium">{content.downloads}</span>
                        </div>
                    )}
                    <div className="flex items-center space-x-1">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        <span className="font-medium">{averageRating.toFixed(1)}</span>
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
