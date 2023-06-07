import { z } from 'zod';

export enum Disease {
    BacterialLeafBlight = 'bacterial_leaf_blight',
    BacterialLeafStreak = 'bacterial_leaf_streak',
    Bakanae = 'bakanae',
    BrownSpot = 'brown_spot',
    GrassyStuntVirus = 'grassy_stunt_virus',
    HealthyRicePlant = 'healthy_rice_plant',
    NarrowBrownSpot = 'narrow_brown_spot',
    RaggedStuntVirus = 'ragged_stunt_virus',
    RiceBlast = 'rice_blast',
    RiceFalseSmut = 'rice_false_smut',
    SheathBlight = 'sheath_blight',
    SheathRot = 'sheath_rot',
    StemRot = 'stem_rot',
    TungroVirus = 'tungro_virus',
}

export const DiseaseSchema = z.nativeEnum(Disease);

const ScoreSchema = z.number().min(0).max(1);

export const ClassificationSchema = z
    .object({ label: DiseaseSchema, score: ScoreSchema })
    .array()
    .transform(classification => {
        const pairs = classification.map(({ label, score }) => [label, score] as const);
        return Object.fromEntries(pairs);
    });
export type Classification = z.infer<typeof ClassificationSchema>;

export const LabelsRecordSchema = z.record(DiseaseSchema, ScoreSchema);
export type LabelsRecord = z.infer<typeof LabelsRecordSchema>;
