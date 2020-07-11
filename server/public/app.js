const app = new Vue({
  el: "#app",
  data: {
    sessionId: "",
    name: "",
    storedSession: null,
    dice: 0,
    rolls: [],
  },
  methods: {
    async createSession() {
      const response = await fetch(`/session`, {
        method: "POST",
      });

      const newSession = await response.json();

      this.storedSession = newSession;
    },
    async joinSession(sessionId) {
      const response = await fetch(`/session/${sessionId}`, {
        method: "GET",
      });

      const existingSession = await response.json();

      this.storedSession = existingSession;
    },
    rollDice(dice) {
      // TODO: Make an api request for this roll
      const newRoll = {
        dice,
        roll: 10,
        createdDate: new Date(),
      };
      this.rolls.push(newRoll);
    },
  },
});
