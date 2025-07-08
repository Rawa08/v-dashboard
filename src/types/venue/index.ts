export enum PlayListNameEnum {
  SPORTS = 'Sports',
  EVENTS = 'Events',
  SPECIALS = 'Specials',
  MENU = 'Menue'
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
  images: PlaylistImage[],
  createdAt: Date,
  createdByUserId: string,
}

export type PlayListsByCategory =
  Record<PlayListNameEnum, PlayList>;

export type Venue = {
  id: string,
  name: string,
  phone: string,
  postalAddress: string,
  postalCode: string,
  city: string,
  country: string,
  venuePlaylistManagers?: string[],
  _count: number,
  playlists: PlayListsByCategory,
};
