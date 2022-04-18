import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { FabricSample, FabricSampleModel } from "./sample.model";
import {
  RejectSampleInput,
  SendSampleInput,
  UniqueSampleInput,
} from "./sample.input";
import { Note, NoteModel } from "../note/note.model";

@Resolver(FabricSample)
export class FabricSampleResolver {
  @Authorized()
  @Mutation(() => FabricSample)
  async sendFabricSample(
    @Arg("data") { ...data }: SendSampleInput
  ): Promise<FabricSample> {
    return FabricSampleModel.sendSample(data);
  }

  @Authorized()
  @Mutation(() => FabricSample)
  async rejectFabricSample(
    @Arg("data") { parentCode, sku, rejectionText: text }: RejectSampleInput
  ): Promise<FabricSample> {
    const sample = await FabricSampleModel.rejectSample(parentCode, sku);
    if (text) {
      const { id: parentId } = sample as { id: unknown };
      const note = await new NoteModel({
        parentId,
        text,
        type: "sampleRejectionComment",
      } as Note).save();
      console.log(note);
    }
    return sample;
  }

  @Authorized()
  @Mutation(() => FabricSample)
  async approveFabricSample(
    @Arg("data") { parentCode, sku }: UniqueSampleInput
  ): Promise<FabricSample> {
    return FabricSampleModel.approveSample(parentCode, sku);
  }
}
