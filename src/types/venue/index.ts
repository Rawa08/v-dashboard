export enum PlayListNameEnum {
  SPORTS = 'SPORTS',
  EVENTS = 'EVENTS',
  SPECIALS = 'SPECIALS',
  MENU = 'MENU'
}

export type PlaylistImage = {
  id: string,
  url: string,
  playListId: string,
  venueId?: string,
  createdAt: Date,
  createdByUserId: string,

}

export type PlayList = {
  category: PlayListNameEnum,
  id: string,
  playlistImages: PlaylistImage[],
  createdAt: Date,
  createdByUserId: string,
}

export type PlayListsByCategory =
  Record<PlayListNameEnum, PlayList>;

export type manager = {
  user: { email: string; id: string; firstName?: string; LastName?: string; phone?: string }
};

export type Venue = {
  id: string,
  name: string,
  phone: string,
  postalAddress: string,
  postalCode: string,
  city: string,
  country: string,
  startDate?: Date,
  contactPersonId?: string,
  updatedAt: Date,
  createdAt: Date,
  venuePlaylistManagers: manager[] | [],
  _count: { devices: number },
  playlists: PlayList[],
};

export type User = {
  id: string;
  firebaseUid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string | null;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
};
