gitGraph
   commit id: "Initial commit"
   branch develop
   checkout develop
   commit id: "Develop commit 1"
   branch feature/feature-1
   checkout feature/feature-1
   commit id: "Feature 1 commit 1"
   commit id: "Feature 1 commit 2"
   checkout develop
   merge feature/feature-1
   commit id: "Develop commit 2"
   branch feature/feature-2
   checkout feature/feature-2
   commit id: "Feature 2 commit 1"
   checkout develop
   merge feature/feature-2
   commit id: "Develop commit 3"
   checkout main
   merge develop
   commit id: "Release 1.0"
