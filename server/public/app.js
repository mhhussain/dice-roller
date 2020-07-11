const app = new Vue({
  el: "#app",
  data: {
    sessionId: "",
    name: "",
    storedSession: null,
    storedName: null,
    dice: 0,
    rolls: [],
  },
  methods: {
    async createSession(name) {
      const response = await fetch(`/session`, {
        method: "POST",
      });

      const newSession = await response.json();

      this.storedSession = newSession;
      this.storedName = name;
    },
    async joinSession(sessionId, name) {
      const response = await fetch(`/session/${sessionId}`, {
        method: "GET",
      });

      const existingSession = await response.json();

      this.storedSession = existingSession;
      this.storedName = name;

      const rollResponse = await fetch(`/roll/${sessionId}/${name}`, {
        method: "GET",
      });

      const existingRolls = await rollResponse.json();

      this.rolls = this.rolls.concat(existingRolls);
    },
    async rollDice(dice) {
      // TODO: Make an api request for this roll
      const response = await fetch(
        `/roll/${this.storedSession._id}/${this.storedName}/${dice}`,
        {
          method: "POST",
        }
      );
      const newRoll = await response.json();
      console.log(newRoll);
      this.rolls.push(newRoll);
    },
    copyToClipboard(data) {
      navigator.clipboard.writeText(data);
    },
  },
});
