import { A, H2, P, UL } from '../Prose';
import type { IPostMeta } from '../posts';

export const meta: IPostMeta = {
    slug: "brats-3d-attention-unet-hackathon",
    title: "Leading a hackathon team on 3D brain-tumor segmentation",
    date: "2026-11-17",
    summary: "Our team placed second at Hack for Research 2025 by training and modifying a published 3D Attention U-Net on BraTS 2019. Notes on the model and on what I would do differently.",
    readingMinutes: 3,
    tags: ["Medical imaging", "PyTorch", "Segmentation"],
};

const Post = () => (
    <>
        <P>{"At Hack for Research 2025 I led a team that worked on brain-tumor segmentation from MRI, and we placed second. We did not design a new architecture. We started from the official code of "}<A href="https://github.com/mobarakol/3D_Attention_UNet">{"Islam et al. (2019), \"Brain Tumor Segmentation and Survival Prediction Using 3D Attention UNet\""}</A>{", and trained and modified it in PyTorch on the BraTS 2019 dataset. The architecture is theirs."}</P>
        <H2>{"The problem"}</H2>
        <P>{"BraTS gives four MRI sequences per patient (T1, contrast-enhanced T1, T2 and FLAIR) as 3D volumes, with expert labels for the tumor sub-regions. The task is to label every voxel. Tumors are a small fraction of the volume, so a model can score well on plain accuracy while missing the tumor entirely; overlap measures such as the Dice score are used instead."}</P>
        <H2>{"Why a 3D model with attention"}</H2>
        <UL>
            <li>{"A 2D network sees one slice at a time and loses the context between slices. A 3D U-Net convolves across the whole volume, at a high memory cost."}</li>
            <li>{"The U-Net shape, an encoder that compresses and a decoder that restores resolution with skip connections between them, keeps fine detail that segmentation needs."}</li>
            <li>{"Attention gates on the skip connections let the decoder weight the regions that matter, which helps when the target is small relative to the image."}</li>
        </UL>
        <H2>{"Things worth knowing about this kind of model"}</H2>
        <UL>
            <li>{"Memory is the main constraint with 3D volumes, so models are usually trained on patches cut from the scan rather than on whole scans."}</li>
            <li>{"The classes are very unbalanced, which is why overlap losses and metrics are preferred to plain accuracy."}</li>
            <li>{"Our modifications are not in the public repository, which is a copy of the authors' code with a note saying so. Keeping a team's changes in their own folder from the start is what makes the work possible to show and reproduce later."}</li>
        </UL>
        <P>{"The figures in the project gallery come from published papers and are credited to their authors; they are not our results."}</P>
    </>
);

export default Post;
