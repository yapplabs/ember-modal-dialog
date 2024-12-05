import Controller from '@ember/controller';

import { codeSnippets } from '../utils/code-snippets/animatable';

export default class AnimatableController extends Controller {
  codeSnippets = codeSnippets;
}
