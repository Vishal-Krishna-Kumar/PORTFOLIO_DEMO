import { A, H2, P, UL } from '../Prose';
import type { IPostMeta } from '../posts';

export const meta: IPostMeta = {
    slug: "deepfake-detection-with-xception",
    title: "Detecting deepfakes with XceptionNet: my final-year project",
    date: "2026-11-17",
    summary: "A final-year team project at SRM: a deepfake detector built on XceptionNet in TensorFlow/Keras, later published at TDEMAS 2023.",
    readingMinutes: 3,
    tags: ["Computer vision", "TensorFlow", "Deepfakes"],
};

const Post = () => (
    <>
        <P>{"My final-year undergraduate project at SRM Institute of Science and Technology was a deepfake detection system, built by a team of students with XceptionNet in TensorFlow/Keras. It was published as: S. Ezra Vethamani, Kawin P., Rishi R., Vishal K., \"Deepfake Detection System: AI and Deep Learning Framework for Cyber Verification\", TDEMAS, 2023. I am a co-author."}</P>
        <H2>{"The approach"}</H2>
        <UL>
            <li>{"A deepfake video is checked frame by frame. Faces are found and cropped, and each face crop is classified as real or manipulated."}</li>
            <li>{"XceptionNet is a convolutional network built from depthwise separable convolutions. It is a common baseline for this task because manipulation leaves subtle local artifacts in texture and blending that such a network can pick up."}</li>
            <li>{"Starting from weights pre-trained on a large image dataset and fine-tuning on face crops is much cheaper than training from nothing."}</li>
        </UL>
        <H2>{"Things worth knowing about deepfake detection"}</H2>
        <UL>
            <li>{"A detector learns the artifacts of the generators it was trained on. Performance on one dataset says little about a new kind of fake, so results should always name the dataset."}</li>
            <li>{"Frames from one video must stay on one side of the train/test split, or the test score is inflated."}</li>
            <li>{"Compression hides the artifacts a detector relies on, so a model that works on high-quality video can fail on video that has been re-encoded for social media."}</li>
        </UL>
        <H2>{"A note on the repository"}</H2>
        <P>{"The "}<A href="https://github.com/Vishal-Krishna-Kumar/DeepFake-Detection-System">{"GitHub repository"}</A>{" linked from my project page is a copy of the open-source PyDeepFakeDet toolkit from the Fudan Vision and Learning Lab, with a note saying so. It is not the code of the 2023 team project, and the animated demo on the project page comes from that toolkit rather than from our system."}</P>
    </>
);

export default Post;
