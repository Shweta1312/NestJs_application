//feature
class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    console.log(`${name} is now a friend`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);
    if (idx == -1){
      throw new Error('Friend not found');
    }

    this.friends.splice(idx,1);
  }
}

//tests
describe('FriendsList', () => {
  let friendsList;

  beforeEach(() => {
    friendsList = new FriendsList();
  })

  it('initializes friends list', () => {
    expect(friendsList.friends.length).toEqual(0);
  });

  it('add a friend to a list', () => {
    friendsList.addFriend('Sam');
    expect(friendsList.friends.length).toEqual(1);
  })

  it('announce friendship', () => {
    //mock function    
    friendsList.announceFriendship = jest.fn();
    expect(friendsList.announceFriendship).not.toHaveBeenCalled();
    friendsList.addFriend('Ariel');
    expect(friendsList.announceFriendship).toHaveBeenCalled();
  })

  describe('removeFriend', () => {
    it('removes a friend from a list', () => {
      friendsList.addFriend('Ariel');
      expect(friendsList.friends[0]).toEqual('Ariel');
      friendsList.removeFriend('Ariel');
      expect(friendsList.friends[0]).toBeUndefined();
    })

    it('throws an error if friend not found', () => {
      expect(() => friendsList.removeFriend('Sam')).toThrow(new Error('Friend not found'));
    })
  })
});
