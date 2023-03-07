<script lang="ts">
  import axios from "axios";

  let what:string;
  let when:string;

async function submitTodo(){
  const result = await axios.post("https://day26bcd.vercel.app/test",{
            what: what,
            when: when,
            
        });
}

</script>
<h2>My To Do List Form</h2>
<div class="form-control w-full max-w-xs">
  <label class="label">
    <span class="label-text">To Do</span>
   
  </label>
  <input bind:value={what} type="text" placeholder="Type What" class="input input-bordered w-full max-w-xs" />
  <input bind:value={when} type="text" placeholder="Type When" class="input input-bordered input-primary w-full max-w-xs" />
  <button on:click={async () => await submitTodo()} class="btn btn-active">Submit</button>


 
</div>

