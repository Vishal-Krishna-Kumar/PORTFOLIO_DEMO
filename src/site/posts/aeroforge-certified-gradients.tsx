import { A, Figure, H2, P, UL } from '../Prose';
import type { IPostMeta } from '../posts';

export const meta: IPostMeta = {
    slug: "aeroforge-certified-gradients",
    title: "Can you trust a neural surrogate's gradients? Notes from AeroForge-TRIAD",
    date: "2026-11-17",
    summary: "Ongoing, unpublished research on error bounds for the gradients of neural CFD surrogates. Two of my own hypotheses were falsified, and one certificate held on every test run.",
    readingMinutes: 5,
    tags: ["Research", "CFD", "Conformal prediction"],
};

const Post = () => (
    <>
        <P>{"AeroForge-TRIAD is research in progress and unpublished; the status here is as of October 2026 ("}<A href="https://github.com/Vishal-Krishna-Kumar/AeroForge-TRIAD">{"repository"}</A>{"). The question: when a neural network stands in for a fluid simulation inside a design optimiser, how wrong are its gradients, and can an error bound on them stay valid for a whole optimisation run?"}</P>
        <H2>{"Setup"}</H2>
        <UL>
            <li>{"A CFD pipeline on the SU2 solver for laminar flow at Reynolds number 1000, with exact adjoint gradients. I checked the adjoint gradients against finite differences; they agree within 0.12%."}</li>
            <li>{"Two design spaces: V1 with 4 parameters (NACA airfoils), and V2 with 13 parameters (12 shape coefficients and the angle of attack)."}</li>
            <li>{"Surrogates: ensembles of 5 Fourier Neural Operators and 5 MLPs."}</li>
            <li>{"The hypotheses and the rules for accepting or rejecting them were written down before looking at the data (protocols v1 to v3)."}</li>
        </UL>
        <H2>{"What the data said"}</H2>
        <UL>
            <li>{"Gradient errors are 3 to 9 times the errors in predicted values. But gradient directions are nearly exact, with cosine similarity around 0.999. My hypothesis that the gradients would be far worse was falsified."}</li>
            <li>{"A standard certificate that assumes independent samples loses coverage along an optimiser run: 0.66 against a 0.90 target. In V2 only 0.20 of runs were covered at every step. The optimiser moves the designs away from the data the certificate was calibrated on."}</li>
            <li>{"Using the certificate to decide when to call the real solver reached the same designs as calling CFD at every step, with 90% fewer CFD calls. My hypothesis that it would find better designs was falsified; what it gives is efficiency."}</li>
            <li>{"A certificate calibrated on the worst error of each run (Theorem 1 in the draft) covered 20 of 20 test runs at alpha 0.1 and 0.85 of runs at alpha 0.2. It was the only method to meet both targets, compared with Gaussian, weighted conformal, ACI and Bonferroni baselines."}</li>
        </UL>
        <H2>{"Limits"}</H2>
        <UL>
            <li>{"The run-level certificate is 3.6 to 4.2 times wider than the standard one and certifies about half of the steps."}</li>
            <li>{"A random-step variant narrowly missed its target: 0.742 against 0.75 at alpha 0.2."}</li>
            <li>{"The transonic regime with shock waves (V3) is still in progress; 17 local pilot runs have converged."}</li>
        </UL>
        <Figure src="/aeroforge-08_gradients.png" alt="The network's design gradient plotted against the exact adjoint gradient" width={960} height={540} caption="A frame from the V3 training video: the network's design direction against the adjoint CFD gradient on calibration shapes." />
        <H2>{"Why pre-register"}</H2>
        <P>{"Two of my hypotheses failed. Because the decision rules were fixed in advance, those failures are results I can report rather than something to explain away, and the claims that did hold are more believable for it. All cloud GPU runs were done on RunPod under explicit budget caps."}</P>
    </>
);

export default Post;
