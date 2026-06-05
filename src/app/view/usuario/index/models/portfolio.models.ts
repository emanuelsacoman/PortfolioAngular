import { Contato } from 'src/app/model/services/interfaces/contato';
import { Profile } from 'src/app/model/services/interfaces/profile';
import { Projeto } from 'src/app/model/services/interfaces/projeto';
import { Resumo } from 'src/app/model/services/interfaces/resumo';
import { Sobre } from 'src/app/model/services/interfaces/sobre';

export type PortfolioSection = 'sobre' | 'resumo' | 'projetos' | 'contato';

export interface AdminNavigationData {
  sobre: Sobre;
  resumo: Resumo;
  projeto: Projeto;
  contato: Contato;
  profile: Profile;
}

export interface GitHubProfile {
  name: string;
  avatar_url: string;
}

export interface HolidayFlags {
  christmas: boolean;
  halloween: boolean;
  newYear: boolean;
  easter: boolean;
  birthday: boolean;
}

export interface SkillBar {
  label: string;
  value: number;
}
