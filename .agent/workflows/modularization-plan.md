---
description: Code Modularization Plan
---

# OpenLearn-Hub Modularization Plan

## Current Structure Issues
1. Root-level files (`constants.tsx`, `types.ts`) scattered in project root
2. All components in a single flat directory (42 files)
3. All pages in a single flat directory (22 files)
4. Services could be better categorized
5. No clear separation between UI components, forms, and modals

## Proposed Modular Structure

```
src/
├── app/
│   ├── App.tsx
│   └── index.tsx
├── components/
│   ├── layout/
│   │   ├── Layout.tsx
│   │   └── Breadcrumbs.tsx
│   ├── ui/
│   │   ├── VoteButtons.tsx
│   │   ├── ShareableLink.tsx
│   │   ├── Heatmap.tsx
│   │   ├── TrustLevelIndicator.tsx
│   │   ├── VerificationBadge.tsx
│   │   ├── FollowEligibilityBadge.tsx
│   │   ├── FollowButton.tsx
│   │   ├── QuizStatusBadge.tsx
│   │   └── EmptySubscriptions.tsx
│   ├── forms/
│   │   ├── verification/
│   │   │   ├── StudentVerificationForm.tsx
│   │   │   ├── TeacherVerificationForm.tsx
│   │   │   └── EducatorVerificationForm.tsx
│   │   ├── upload/
│   │   │   ├── FileUpload.tsx
│   │   │   ├── WatermarkInput.tsx
│   │   │   ├── CourseUploadForm.tsx
│   │   │   └── UploadWizard.tsx
│   │   ├── content-source/
│   │   │   └── ContentSourceForm.tsx
│   │   ├── organization/
│   │   │   ├── OrganizationPathSelector.tsx
│   │   │   ├── SubjectPathForm.tsx
│   │   │   ├── UniversityPathForm.tsx
│   │   │   ├── ChannelPathForm.tsx
│   │   │   └── UploadTypeSelector.tsx
│   │   ├── community/
│   │   │   └── CommunityContributorForm.tsx
│   │   └── auth/
│   │       └── RoleSelector.tsx
│   ├── modals/
│   │   ├── AuthRequiredModal.tsx
│   │   ├── ChatbotVerificationModal.tsx
│   │   └── CourseGatekeeperModal.tsx
│   ├── content/
│   │   ├── EnhancedContentCard.tsx
│   │   ├── ProtectedNoteViewer.tsx
│   │   ├── MultiTagPreview.tsx
│   │   ├── SubscriptionCreatorRow.tsx
│   │   └── NoteTopicGroup.tsx
│   ├── quiz/
│   │   ├── QuizEditor.tsx
│   │   ├── QuizAttachment.tsx
│   │   └── QuizPublishingGuard.tsx
│   ├── interaction/
│   │   ├── CommentSection.tsx
│   │   └── ReviewSection.tsx
│   ├── editor/
│   │   └── RichTextEditor.tsx
│   ├── drive/
│   │   └── DriveExplorer.tsx
│   └── chat/
│       └── AIChatbot.tsx
├── pages/
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   ├── SignUpPage.tsx
│   │   └── VerificationPage.tsx
│   ├── hub/
│   │   ├── HubExplorer.tsx
│   │   ├── TopicExplorer.tsx
│   │   ├── SubtopicExplorer.tsx
│   │   ├── TopicDetail.tsx
│   │   └── BrowseByPathPage.tsx
│   ├── content/
│   │   ├── ContentDetail.tsx
│   │   ├── NoteUploadPage.tsx
│   │   ├── TrendingNotesPage.tsx
│   │   ├── SharedNotePage.tsx
│   │   └── CourseNoteAccessPage.tsx
│   ├── quiz/
│   │   └── QuizCreationPage.tsx
│   ├── user/
│   │   ├── Dashboard.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── SubscriptionsPage.tsx
│   │   └── ContributionPage.tsx
│   ├── drive/
│   │   ├── DrivePage.tsx
│   │   └── DriveOrganizer.tsx
│   ├── ai/
│   │   └── AIChatPage.tsx
│   └── demo/
│       └── MockUIDemo.tsx
├── services/
│   ├── auth/
│   │   └── authService.ts
│   ├── content/
│   │   ├── contentSourceValidator.ts
│   │   └── interactionService.ts
│   ├── quiz/
│   │   ├── chatbotQuizVerifier.ts
│   │   └── quizPublishingService.ts
│   ├── user/
│   │   ├── trustLevelService.ts
│   │   └── subscriptionService.ts
│   ├── drive/
│   │   └── driveSyncService.ts
│   ├── download/
│   │   └── guestDownloadService.ts
│   └── ai/
│       └── geminiService.ts
├── types/
│   ├── index.ts (main export)
│   ├── auth.types.ts
│   ├── content.types.ts
│   ├── quiz.types.ts
│   ├── user.types.ts
│   └── subscription.types.ts
├── constants/
│   ├── index.ts (main export)
│   ├── subjects.ts
│   └── organizationConstants.ts
├── utils/
│   ├── validation/
│   │   ├── emailValidator.ts
│   │   └── fileValidator.ts
│   └── index.ts
├── data/
│   └── demoContents.ts
├── dashboards/
│   └── guest/
│       └── [guest dashboard files]
├── config/
│   ├── vite.config.ts
│   └── tsconfig.json
└── assets/
    └── styles/ (if needed later)
```

## Migration Steps

### Phase 1: Create New Directory Structure
1. Create all new directories under `src/`
2. Move configuration files to `config/`

### Phase 2: Move and Reorganize Components
1. Move layout components to `components/layout/`
2. Move UI components to `components/ui/`
3. Move form components to appropriate subdirectories in `components/forms/`
4. Move modals to `components/modals/`
5. Move specialized components to their respective directories

### Phase 3: Reorganize Pages
1. Move authentication pages to `pages/auth/`
2. Move hub exploration pages to `pages/hub/`
3. Move content pages to `pages/content/`
4. Move user-related pages to `pages/user/`
5. Move other specialized pages to their directories

### Phase 4: Reorganize Services
1. Create service subdirectories
2. Move each service to its appropriate category

### Phase 5: Split and Organize Types
1. Split `types.ts` into logical modules
2. Create barrel export in `types/index.ts`

### Phase 6: Reorganize Constants
1. Split `constants.tsx` if needed
2. Create barrel export in `constants/index.ts`
3. Move organization constants

### Phase 7: Update All Imports
1. Update import paths in all files
2. Use barrel exports where appropriate

### Phase 8: Verify Build
1. Run build command
2. Test application functionality
3. Fix any remaining import issues

## Benefits
1. **Better Organization**: Related files are grouped together
2. **Easier Navigation**: Clear hierarchy makes finding files easier
3. **Scalability**: Easy to add new features in appropriate directories
4. **Maintainability**: Changes are isolated to specific modules
5. **Team Collaboration**: Clear structure reduces confusion
6. **Import Clarity**: Shorter, more meaningful import paths with barrel exports
