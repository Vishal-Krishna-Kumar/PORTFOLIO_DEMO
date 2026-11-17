import type { ComponentType } from "react";

import RetrieverPost, { meta as retrieverMeta } from "./posts/chunk-size-depends-on-retriever";
import ChunkingPost, { meta as chunkingMeta } from "./posts/chunking-cuts-the-answer";
import InvertedIndexPost, { meta as invertedIndexMeta } from "./posts/inverted-index-in-numpy";

import ScoringKgRagOnBiomixqaPost, { meta as scoringKgRagOnBiomixqaMeta } from "./posts/scoring-kg-rag-on-biomixqa";
import Brats3dAttentionUnetHackathonPost, { meta as brats3dAttentionUnetHackathonMeta } from "./posts/brats-3d-attention-unet-hackathon";
import DeepfakeDetectionWithXceptionPost, { meta as deepfakeDetectionWithXceptionMeta } from "./posts/deepfake-detection-with-xception";
import AlphazeroSelfPlayNotesPost, { meta as alphazeroSelfPlayNotesMeta } from "./posts/alphazero-self-play-notes";
import HmmVsLstmPosTaggingPost, { meta as hmmVsLstmPosTaggingMeta } from "./posts/hmm-vs-lstm-pos-tagging";
import ScrollDrivenSiteWithGsapPost, { meta as scrollDrivenSiteWithGsapMeta } from "./posts/scroll-driven-site-with-gsap";
import RaycastingFpsInPygamePost, { meta as raycastingFpsInPygameMeta } from "./posts/raycasting-fps-in-pygame";
import AeroforgeCertifiedGradientsPost, { meta as aeroforgeCertifiedGradientsMeta } from "./posts/aeroforge-certified-gradients";

export interface IPostMeta {
  slug: string;
  title: string;
  /** ISO date, for example 2026-11-14 */
  date: string;
  summary: string;
  readingMinutes: number;
  tags: string[];
}

export interface IPost extends IPostMeta {
  Content: ComponentType;
}

// Newest first. To add a post: create a file in ./posts and list it here.
export const POSTS: IPost[] = [
  { ...retrieverMeta, Content: RetrieverPost },
  { ...chunkingMeta, Content: ChunkingPost },
  { ...invertedIndexMeta, Content: InvertedIndexPost },
  // Project write-ups
  { ...scoringKgRagOnBiomixqaMeta, Content: ScoringKgRagOnBiomixqaPost },
  { ...brats3dAttentionUnetHackathonMeta, Content: Brats3dAttentionUnetHackathonPost },
  { ...deepfakeDetectionWithXceptionMeta, Content: DeepfakeDetectionWithXceptionPost },
  { ...alphazeroSelfPlayNotesMeta, Content: AlphazeroSelfPlayNotesPost },
  { ...hmmVsLstmPosTaggingMeta, Content: HmmVsLstmPosTaggingPost },
  { ...scrollDrivenSiteWithGsapMeta, Content: ScrollDrivenSiteWithGsapPost },
  { ...raycastingFpsInPygameMeta, Content: RaycastingFpsInPygamePost },
  { ...aeroforgeCertifiedGradientsMeta, Content: AeroforgeCertifiedGradientsPost },
];

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
